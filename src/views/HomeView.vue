<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import AboutView from './AboutView.vue'
import SkillsView from './SkillsView.vue'
import ProjectsView from './ProjectsView.vue'
import EducationView from './EducationView.vue'
import ContactView from './ContactView.vue'
const page = ref(null)
useScrollReveal(page)
</script>

<template>
  <div ref="page">
  <section id="top" class="container hero" aria-label="Introduction">
    <div class="hero-copy">
      <span class="design-badge">V3 DESIGN TEST</span>
      <span class="eyebrow">FULL-STACK DEVELOPER</span>
      <h1>Crafting<br><span class="highlight">Scalable<br>Digital</span><br>Experiences.</h1>
      <p class="hero-description">I build robust web applications with modern technologies. Bridging the gap between beautiful design and technical excellence.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#projects">View My Work <span aria-hidden="true">&rarr;</span></a>
        <a class="btn btn-outline" href="#contact">Contact Me</a>
      </div>
    </div>
    <div class="portrait-wrap">
      <img class="profile-img" src="/Isolated%20Young%20Man%20in%20Navy%20Sweatshirt.png" alt="Portrait of Adam Jattiem" loading="eager" width="1299" height="1211">
    </div>
  </section>
  <AboutView />
  <SkillsView />
  <ProjectsView />
  <EducationView />
  <ContactView />
  </div>
</template>

<style scoped>
.hero { position: relative; isolation: isolate; width: 100%; max-width: none; min-height: calc(100svh - 77px); display: grid; grid-template-columns: 1.12fr .88fr; align-items: center; gap: 80px; padding: 70px max(28px, calc((100% - 1064px) / 2)) 74px; scroll-margin-top: 77px; background-color: var(--background); background-image: linear-gradient(90deg, rgba(9,16,30,.76) 0%, rgba(9,16,30,.48) 43%, rgba(9,16,30,.12) 82%), linear-gradient(to bottom, rgba(16,24,39,.04) 0%, rgba(16,24,39,.01) 48%, rgba(16,24,39,.32) 72%, rgba(16,24,39,.83) 92%, #101827 100%), url('/wordpress/mountain-sunset.jpg'); background-position: center; background-size: cover; background-repeat: no-repeat; }
.hero-copy { min-width: 0; position: relative; z-index: 2; }
.hero-copy, .portrait-wrap { animation: hero-enter 750ms var(--motion-ease) both; }
.portrait-wrap { animation-delay: 110ms; }
@keyframes hero-enter { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.design-badge { display: table; margin-bottom: 14px; padding: 7px 11px; border: 1px solid rgba(113,176,255,.42); border-radius: 100px; background: rgba(28,84,157,.32); color: #c2dfff; font-size: 10px; font-weight: 800; letter-spacing: .14em; line-height: 1; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(232,214,207,.35); background: rgba(18,33,52,.74); color: var(--sunset); padding: 7px 11px; border-radius: 100px; font-size: 10px; font-weight: 700; letter-spacing: .11em; line-height: 1; }
.eyebrow::before { content: ''; height: 7px; width: 7px; border-radius: 50%; background: #2f78ed; }
.hero h1 { margin: 25px 0 24px; font-size: clamp(51px, 5.35vw, 78px); line-height: 1.09; font-weight: 800; letter-spacing: -.052em; color: var(--text); text-shadow: 0 3px 22px rgba(5,12,25,.64); }
.highlight { color: #a5ceff; background: linear-gradient(115deg, #d1e7ff 0%, #78b5ff 65%, #6099ef 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.hero-description { max-width: 490px; color: #f0f5fc; text-shadow: 0 2px 13px rgba(4,9,20,.64); font-size: 16px; line-height: 1.72; font-weight: 400; margin: 0 0 28px; }
.hero-actions { display: flex; align-items: center; gap: 13px; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 6px; font-size: 13px; font-weight: 800; min-height: 48px; padding: 0 23px; transition: transform .22s var(--motion-ease), background .22s, border-color .22s, box-shadow .22s; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(6,13,28,.27); }
.btn span { display: inline-block; transition: transform .22s var(--motion-ease); }
.btn:hover span { transform: translateX(3px); }
.btn-primary { background: linear-gradient(135deg, #377fe7, #245cc5); color: #fff; box-shadow: 0 10px 26px rgba(24, 91, 201, .35); }
.btn-primary:hover { background: linear-gradient(135deg, #5197f4, #2d6bd8); box-shadow: 0 14px 30px rgba(24, 91, 201, .5); }
.btn-outline { border: 1px solid rgba(210,230,255,.46); color: #f1f7ff; background: rgba(24,42,65,.42); backdrop-filter: blur(10px); }
.btn-outline:hover { border-color: rgba(210,230,255,.8); background: rgba(63,99,142,.5); }
.portrait-wrap { width: 100%; max-width: 430px; justify-self: end; position: relative; top: -30px; }
.portrait-wrap::before { content: ""; position: absolute; z-index: -1; inset: 12% 2% 8%; border-radius: 50%; background: radial-gradient(ellipse, rgba(64,133,226,.32), rgba(64,133,226,0) 70%); filter: blur(24px); pointer-events: none; }
.profile-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: auto;
  object-fit: contain;
  object-position: center bottom;
  border: 0;
  border-radius: 0;
  background: transparent;
  filter: drop-shadow(0 8px 16px rgba(9, 16, 30, 0.12)) drop-shadow(0 24px 30px rgba(9, 16, 30, 0.12));
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 70%, rgba(0, 0, 0, 0.94) 76%, rgba(0, 0, 0, 0.53) 89%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 70%, rgba(0, 0, 0, 0.94) 76%, rgba(0, 0, 0, 0.53) 89%, transparent 100%);
}
@media (max-width: 950px) {
  .hero { gap: 44px; grid-template-columns: 1fr .88fr; }
  .hero h1 { font-size: clamp(42px, 6.4vw, 65px); }
}
@media (min-width: 741px) and (max-width: 1050px) { .hero { padding-left: 34px; padding-right: 34px; } }
@media (max-width: 740px) {
  .hero { display: flex; flex-direction: column; align-items: stretch; gap: 40px; min-height: 0; padding: 72px 22px 80px; scroll-margin-top: 68px; background-position: 57% center; background-image: linear-gradient(90deg, rgba(9,16,30,.76) 0%, rgba(9,16,30,.48) 62%, rgba(9,16,30,.24) 100%), linear-gradient(to bottom, rgba(16,24,39,.03) 0%, rgba(16,24,39,.08) 51%, rgba(16,24,39,.62) 87%, #101827 100%), url('/wordpress/mountain-sunset.jpg'); }
  .hero h1 { font-size: clamp(43px, 9vw, 64px); line-height: 1.12; margin: 25px 0 23px; }
  .hero-description { font-size: 15px; max-width: 550px; }
  .portrait-wrap { width: min(88%, 390px); align-self: center; margin-top: 15px; max-width: none; top: -14px; }
}
@media (prefers-reduced-motion: reduce) { .hero-copy, .portrait-wrap { animation: none; } .btn, .btn span { transition: none; } .btn:hover, .btn:hover span { transform: none; } }
@media (max-width: 390px) {
  .hero h1 { font-size: 40px; }
  .btn { min-height: 44px; font-size: 12px; padding: 0 16px; }
  .portrait-wrap { width: 92%; }
}
</style>
