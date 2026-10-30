const { chromium } = await import('playwright').catch(() => import('../.migration/browser-tools/node_modules/playwright/index.mjs'));
import fs from 'node:fs/promises';
const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
await fs.mkdir('.migration', { recursive: true });
const browser = process.env.BROWSER_CDP_URL
  ? await chromium.connectOverCDP(process.env.BROWSER_CDP_URL)
  : await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined });
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const results=[];
for(const width of [320,375,390,430,768,1024,1440]) {
 await page.setViewportSize({width,height:1000});await page.goto(baseURL + '/');await page.evaluate(()=>document.fonts.ready);
 for(const id of ['top','projects','about','skills','certifications','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(60);}
 const layout=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),overflow:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&getComputedStyle(e).position!=='absolute').slice(0,15).map(e=>[e.tagName,e.className,Math.round(e.getBoundingClientRect().right)])}));
 await page.locator('#projects').scrollIntoViewIfNeeded();const heights=[];
 for(let index=0;index<5;index++){await page.locator('.project-index button').nth(index).click();heights.push(await page.locator('#project-stage').evaluate(e=>({height:e.offsetHeight,cover:e.querySelector('.project-cover').offsetHeight,copy:e.querySelector('.project-copy').offsetHeight,scrollY})));}
 if (layout.scrollWidth > width || layout.broken.length) throw Error('Layout or image failure at '+width);
 if (new Set(heights.map(item => item.height)).size !== 1) throw Error('Project height changes at '+width);
 if (new Set(heights.map(item => item.scrollY)).size !== 1) throw Error('Project switching scrolls the page at '+width);
 results.push({width,layout,heights});
 await page.locator('.project-index button').first().click();await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:`.migration/vue-${width}.png`,fullPage:true});
}
if (errors.length) throw Error(errors.join('\n'));
console.log(JSON.stringify(results.map(r=>({width:r.width,projectHeight:r.heights[0].height,brokenImages:r.layout.broken.length,documentWidth:r.layout.scrollWidth})),null,2));await fs.writeFile('.migration/layout-results.json',JSON.stringify({results,errors},null,2));
await context.close();await browser.close();
