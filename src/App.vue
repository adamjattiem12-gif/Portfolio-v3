<script setup>
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
const systemReduced = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
const manualOff = ref(false)
try { manualOff.value = localStorage.getItem('portfolio-motion-off') === 'true' } catch { /* Storage is optional. */ }
const motionOff = computed(() => systemReduced.value || manualOff.value)
function toggleMotion() {
  manualOff.value = !manualOff.value
  try { localStorage.setItem('portfolio-motion-off', String(manualOff.value)) } catch { /* Storage is optional. */ }
}
provide('motion', { motionOff, toggleMotion })
watch(motionOff, (off) => {
  if (off) document.getAnimations().forEach(animation => animation.cancel())
})
const progress = ref(0)
const router = useRouter()
let frame = 0
let media
let resizeObserver
let visibilityObserver
let revealObserver
function scheduleProgress() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    const extent = document.documentElement.scrollHeight - innerHeight
    progress.value = extent > 0 ? Math.max(0, Math.min(1, scrollY / extent)) : 0
    frame = 0
  })
}
function preferenceChanged(event) { systemReduced.value = event.matches }
onMounted(async () => {
  await router.isReady()
  await nextTick()
  media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preferenceChanged)
  window.addEventListener('scroll', scheduleProgress, { passive: true })
  window.addEventListener('resize', scheduleProgress, { passive: true })
  resizeObserver = new ResizeObserver(scheduleProgress)
  resizeObserver.observe(document.documentElement)
  visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('animation-paused', !entry.isIntersecting))
  })
  document.querySelectorAll('main > section').forEach(el => visibilityObserver.observe(el))
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enh-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: .03, rootMargin: '0px 0px 25px 0px' })
  document.querySelectorAll('.work-heading,.skill-intro,.story-heading,.credentials-heading,.contact-copy').forEach(el => {
    el.classList.add('enh-reveal')
    revealObserver.observe(el)
  })
  document.documentElement.classList.add('enh-reveal-ready')
  scheduleProgress()
})
onUnmounted(() => {
  media?.removeEventListener('change', preferenceChanged)
  window.removeEventListener('scroll', scheduleProgress)
  window.removeEventListener('resize', scheduleProgress)
  resizeObserver?.disconnect(); visibilityObserver?.disconnect(); revealObserver?.disconnect()
  cancelAnimationFrame(frame)
  document.documentElement.classList.remove('enh-reveal-ready')
})
</script>

<template>
  <div class="afterlight" :class="{ 'motion-off': motionOff }">
    <div id="aj-scroll-progress-track" role="progressbar" aria-label="Page scroll progress" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(progress * 100)">
      <span id="aj-scroll-progress-fill" :style="{ transform: `scaleX(${progress})` }"></span>
    </div>
    <a class="skip-link" href="#main">Skip to content</a>
    <TheHeader />
    <main id="main"><RouterView /></main>
    <TheFooter />
  </div>
</template>
