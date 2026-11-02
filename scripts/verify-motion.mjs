import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'

const { chromium } = await import('playwright').catch(() => import('../.migration/browser-tools/node_modules/playwright/index.mjs'))
const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173'
const svg = await fs.readFile('public/design/hero-astronaut.svg', 'utf8')
const imageData = source => source.match(/data:image\/[^"']+/)?.[0]
assert.ok(imageData(svg), 'Astronaut image exists')
assert.equal(crypto.createHash('sha256').update(imageData(svg)).digest('hex'), 'a60ed026f2e1a1b9e33616a884c58e435dfd00c2cfdc6587ec36928052d0af78', 'Embedded astronaut image is unchanged')
assert.ok(svg.indexOf('url(#ring-rear)') < svg.indexOf('<circle cx="640" cy="355" r="215" fill='))
assert.ok(svg.indexOf('url(#ring-front)') > svg.indexOf('<circle cx="640" cy="355" r="215" fill='))

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined })
await fs.mkdir('.migration', { recursive: true })
const errors = []
const results = []
const check = (condition, label) => { assert.ok(condition, label); results.push(label) }
const waitForSection = async (page, id) => page.waitForFunction(id => {
  const section = document.getElementById(id)
  const header = document.querySelector('.site-header')
  return Math.abs(section.getBoundingClientRect().top - header.offsetHeight) < 3
}, id)

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  await page.addInitScript(() => {
    const nativeScrollTo = window.scrollTo.bind(window)
    window.scrollCalls = []
    window.scrollTo = (...args) => { window.scrollCalls.push(args[0]); return nativeScrollTo(...args) }
  })
  await page.goto(baseURL + '/')
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.hero-art').screenshot({ path: '.migration/planet-desktop.png' })
  await page.locator('#main-nav a[href$="#skills"]').click()
  await page.waitForTimeout(100)
  const during = await page.evaluate(() => ({ y: scrollY, target: document.querySelector('#skills').offsetTop - document.querySelector('.site-header').offsetHeight }))
  check(during.y > 0 && during.y < during.target - 10, 'Section navigation visibly scrolls in normal motion')
  await waitForSection(page, 'skills')
  check(new URL(page.url()).hash === '#skills', 'Section URL hash is retained')
  check(await page.evaluate(() => window.scrollCalls.some(call => call?.behavior === 'smooth')), 'Router requests native smooth scrolling')
  check(Number(await page.locator('#aj-scroll-progress-track').getAttribute('aria-valuenow')) > 0, 'Scroll progress updates during navigation')
  await page.locator('#main-nav a[href$="#about"]').click()
  await page.locator('#main-nav a[href$="#contact"]').click()
  await waitForSection(page, 'contact')
  check(new URL(page.url()).hash === '#contact', 'Rapid navigation settles at the latest destination')
  await page.goBack()
  check(new URL(page.url()).hash === '#about', 'Back navigation restores the previous hash')
  await page.goForward()
  check(new URL(page.url()).hash === '#contact', 'Forward navigation restores the next hash')
  await page.goto(baseURL + '/#skills')
  await waitForSection(page, 'skills')
  check(true, 'Direct section link clears the sticky header')
  await page.reload()
  await waitForSection(page, 'skills')
  check(true, 'Section link survives reload')
  await page.goto(baseURL + '/')
  await page.locator('.motion-toggle').click()
  check(await page.locator('.hero-art img').evaluate(el => getComputedStyle(el).animationName === 'none'), 'Motion Off stops astronaut animation')
  await page.locator('#main-nav a[href$="#projects"]').click()
  await waitForSection(page, 'projects')
  check(await page.evaluate(() => window.scrollCalls.at(-1)?.behavior === 'instant'), 'Motion Off uses immediate section navigation')
  await page.locator('.wordmark').click()
  await page.locator('.motion-toggle').click()
  check(await page.locator('.hero-art img').evaluate(el => getComputedStyle(el).animationName !== 'none'), 'Motion On restores astronaut animation without reload')
  await page.locator('#main-nav a[href$="#skills"]').click()
  await waitForSection(page, 'skills')
  check(await page.evaluate(() => window.scrollCalls.at(-1)?.behavior === 'smooth'), 'Motion On restores smooth section navigation')
  await context.close()

  const responsive = await browser.newContext({ reducedMotion: 'no-preference' })
  const viewportPage = await responsive.newPage()
  viewportPage.on('pageerror', error => errors.push(error.message))
  await viewportPage.addInitScript(() => {
    const nativeScrollTo = window.scrollTo.bind(window)
    window.scrollCalls = []
    window.scrollTo = (...args) => { window.scrollCalls.push(args[0]); return nativeScrollTo(...args) }
  })
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await viewportPage.setViewportSize({ width, height: 900 })
    await viewportPage.goto(baseURL + '/')
    if (width <= 650) await viewportPage.locator('#menu-toggle').click()
    await viewportPage.locator('#main-nav a[href$="#projects"]').click()
    await waitForSection(viewportPage, 'projects')
    check(await viewportPage.evaluate(() => window.scrollCalls.at(-1)?.behavior === 'smooth' && document.documentElement.scrollWidth <= innerWidth), `${width}px: smooth navigation, header clearance, and no horizontal overflow`)
  }
  await responsive.close()

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', hasTouch: true })
  const mobile = await reduced.newPage()
  mobile.on('pageerror', error => errors.push(error.message))
  await mobile.addInitScript(() => {
    const nativeScrollTo = window.scrollTo.bind(window)
    window.scrollCalls = []
    window.scrollTo = (...args) => { window.scrollCalls.push(args[0]); return nativeScrollTo(...args) }
  })
  await mobile.goto(baseURL + '/')
  await mobile.locator('.hero-art').screenshot({ path: '.migration/planet-mobile.png' })
  await mobile.locator('#menu-toggle').click()
  await mobile.locator('#main-nav a[href$="#skills"]').click()
  await waitForSection(mobile, 'skills')
  check(await mobile.locator('#menu-toggle').getAttribute('aria-expanded') === 'false', 'Mobile menu closes after navigation')
  check(await mobile.evaluate(() => window.scrollCalls.at(-1)?.behavior === 'instant'), 'System reduced motion uses immediate navigation')
  check(await mobile.locator('.hero-art img').evaluate(el => getComputedStyle(el).animationName === 'none'), 'System reduced motion stops astronaut animation')
  await reduced.close()

  const fallback = await browser.newContext({ reducedMotion: 'no-preference' })
  const noObserver = await fallback.newPage()
  noObserver.on('pageerror', error => errors.push(error.message))
  await noObserver.addInitScript(() => { delete window.IntersectionObserver; delete window.ResizeObserver })
  await noObserver.goto(baseURL + '/')
  await noObserver.locator('#main-nav a[href$="#skills"]').click()
  await waitForSection(noObserver, 'skills')
  check(await noObserver.locator('.skill-intro').evaluate(el => getComputedStyle(el).opacity === '1'), 'Content remains visible without observers')
  await fallback.close()
  check(errors.length === 0, `No browser errors: ${errors.join('; ')}`)
  console.log(JSON.stringify({ passed: results.length, results }, null, 2))
} finally {
  await browser.close()
}
