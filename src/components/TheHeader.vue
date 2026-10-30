<script setup>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const open = ref(false)
const activeSection = ref('')
let observer
function escape(event) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    document.getElementById('menu-toggle')?.focus()
  }
}
watch(open, (value) => {
  if (!value && document.activeElement?.closest('#main-nav')) {
    document.getElementById('menu-toggle')?.focus()
  }
})
onMounted(async () => {
  await router.isReady()
  await nextTick()
  window.addEventListener('keydown', escape)
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (visible) activeSection.value = visible.target.id
  }, { rootMargin: '-90px 0px -45% 0px', threshold: [0, .1, .3] })
  document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el))
})
onUnmounted(() => { window.removeEventListener('keydown', escape); observer?.disconnect() })
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Adam Jattiem, back to top">
      <span class="brand-symbol" aria-hidden="true">✦</span>
      <span>ADAM JATTIEM<small>SOFTWARE DEVELOPER / PORTFOLIO</small>
      </span>
    </a>
    <button id="menu-toggle" type="button" class="menu-toggle" aria-controls="main-nav" :aria-expanded="open" @click="open = !open">{{ open ? 'Close −' : 'Explore +' }}</button>
    <nav id="main-nav" class="" aria-label="Main navigation" :class="{ open }">
      <a href="#projects" @click="open = false" :aria-current="activeSection === 'projects' ? 'location' : undefined">Work</a>
      <a href="#about" @click="open = false" :aria-current="activeSection === 'about' ? 'location' : undefined">My story</a>
      <a href="#skills" @click="open = false" :aria-current="activeSection === 'skills' ? 'location' : undefined">Toolkit</a>
      <a href="#certifications" @click="open = false" :aria-current="activeSection === 'certifications' ? 'location' : undefined">Credentials</a>
      <a href="#contact" @click="open = false" :aria-current="activeSection === 'contact' ? 'location' : undefined">Contact<span aria-hidden="true">↗</span>
      </a>
    </nav>
  </header>
</template>
