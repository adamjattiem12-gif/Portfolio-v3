<script setup>
import { inject, ref, onUnmounted } from 'vue'
const { motionOff, toggleMotion } = inject('motion')
const mapShown = ref(false)
const hero = ref(null)
let frame = 0
function moveArtwork(event) {
  if (motionOff.value || event.pointerType !== 'mouse' || innerWidth < 800 || frame) return
  const rect = hero.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - .5
  const y = (event.clientY - rect.top) / rect.height - .5
  frame = requestAnimationFrame(() => {
    hero.value?.style.setProperty('--enh-drift-x', `${-x * 12}px`)
    hero.value?.style.setProperty('--enh-drift-y', `${-y * 10}px`)
    frame = 0
  })
}
function resetArtwork() {
  cancelAnimationFrame(frame); frame = 0
  hero.value?.style.setProperty('--enh-drift-x', '0px')
  hero.value?.style.setProperty('--enh-drift-y', '0px')
}
onUnmounted(resetArtwork)
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-heading" ref="hero" @pointermove="moveArtwork" @pointerleave="resetArtwork">
    <div class="enh-cosmos" aria-hidden="true">
      <span class="enh-star" style="--sx: 68.31%; --sy: 80.92%; --sz: 1.7px; --so: 0.58; --sd: 5.11s; --delay: -9.08s;">
      </span>
      <span class="enh-star" style="--sx: 63.12%; --sy: 41.68%; --sz: 1.1px; --so: 0.22; --sd: 8.71s; --delay: -7.89s;">
      </span>
      <span class="enh-star" style="--sx: 52.20%; --sy: 34.92%; --sz: 2.8px; --so: 0.61; --sd: 11.45s; --delay: -2.56s;">
      </span>
      <span class="enh-star" style="--sx: 97.14%; --sy: 55.23%; --sz: 2.0px; --so: 0.33; --sd: 7.80s; --delay: -5.73s;">
      </span>
      <span class="enh-star" style="--sx: 77.88%; --sy: 27.73%; --sz: 1.5px; --so: 0.46; --sd: 6.63s; --delay: -7.76s;">
      </span>
      <span class="enh-star" style="--sx: 98.06%; --sy: 32.36%; --sz: 2.7px; --so: 0.57; --sd: 12.24s; --delay: -11.16s;">
      </span>
      <span class="enh-star" style="--sx: 91.67%; --sy: 34.39%; --sz: 1.4px; --so: 0.39; --sd: 5.61s; --delay: -11.64s;">
      </span>
      <span class="enh-star" style="--sx: 93.65%; --sy: 15.83%; --sz: 2.3px; --so: 0.65; --sd: 12.56s; --delay: -9.78s;">
      </span>
      <span class="enh-star" style="--sx: 93.57%; --sy: 38.01%; --sz: 1.3px; --so: 0.27; --sd: 10.66s; --delay: -7.88s;">
      </span>
      <span class="enh-star" style="--sx: 50.10%; --sy: 69.35%; --sz: 2.2px; --so: 0.45; --sd: 11.02s; --delay: -9.48s;">
      </span>
      <span class="enh-star" style="--sx: 86.41%; --sy: 85.40%; --sz: 2.5px; --so: 0.64; --sd: 11.27s; --delay: -7.77s;">
      </span>
      <span class="enh-star" style="--sx: 82.90%; --sy: 38.06%; --sz: 2.0px; --so: 0.60; --sd: 12.12s; --delay: -9.56s;">
      </span>
      <span class="enh-star" style="--sx: 96.20%; --sy: 22.61%; --sz: 2.5px; --so: 0.55; --sd: 10.93s; --delay: -7.16s;">
      </span>
      <span class="enh-star" style="--sx: 56.07%; --sy: 86.64%; --sz: 1.8px; --so: 0.16; --sd: 7.72s; --delay: -3.86s;">
      </span>
      <span class="enh-star" style="--sx: 97.76%; --sy: 23.84%; --sz: 2.7px; --so: 0.44; --sd: 6.85s; --delay: -0.00s;">
      </span>
      <span class="enh-star" style="--sx: 60.86%; --sy: 50.92%; --sz: 2.4px; --so: 0.23; --sd: 11.72s; --delay: -7.88s;">
      </span>
      <span class="enh-star" style="--sx: 78.51%; --sy: 90.59%; --sz: 2.2px; --so: 0.44; --sd: 10.29s; --delay: -0.03s;">
      </span>
      <span class="enh-star" style="--sx: 88.56%; --sy: 10.09%; --sz: 2.6px; --so: 0.67; --sd: 9.17s; --delay: -6.97s;">
      </span>
      <span class="enh-star" style="--sx: 47.21%; --sy: 26.13%; --sz: 2.5px; --so: 0.48; --sd: 5.66s; --delay: -11.26s;">
      </span>
      <span class="enh-star" style="--sx: 86.10%; --sy: 72.08%; --sz: 1.3px; --so: 0.26; --sd: 6.63s; --delay: -1.63s;">
      </span>
      <span class="enh-star" style="--sx: 82.80%; --sy: 19.59%; --sz: 2.4px; --so: 0.54; --sd: 11.89s; --delay: -10.67s;">
      </span>
      <span class="enh-star" style="--sx: 56.44%; --sy: 82.84%; --sz: 1.5px; --so: 0.34; --sd: 12.73s; --delay: -5.11s;">
      </span>
      <span class="enh-star" style="--sx: 92.72%; --sy: 82.29%; --sz: 2.4px; --so: 0.55; --sd: 12.37s; --delay: -9.82s;">
      </span>
      <span class="enh-star" style="--sx: 45.11%; --sy: 79.24%; --sz: 1.5px; --so: 0.46; --sd: 11.75s; --delay: -7.13s;">
      </span>
      <span class="enh-star" style="--sx: 63.38%; --sy: 80.11%; --sz: 2.5px; --so: 0.25; --sd: 8.93s; --delay: -0.85s;">
      </span>
      <span class="enh-star" style="--sx: 87.39%; --sy: 65.18%; --sz: 2.7px; --so: 0.25; --sd: 11.12s; --delay: -5.03s;">
      </span>
      <span class="enh-star" style="--sx: 59.67%; --sy: 39.95%; --sz: 1.4px; --so: 0.34; --sd: 10.02s; --delay: -3.47s;">
      </span>
      <span class="enh-star" style="--sx: 94.74%; --sy: 60.93%; --sz: 1.5px; --so: 0.60; --sd: 5.71s; --delay: -2.26s;">
      </span>
      <span class="enh-star" style="--sx: 68.61%; --sy: 81.73%; --sz: 2.7px; --so: 0.67; --sd: 12.88s; --delay: -0.49s;">
      </span>
      <span class="enh-star" style="--sx: 57.80%; --sy: 5.79%; --sz: 2.6px; --so: 0.50; --sd: 7.79s; --delay: -9.35s;">
      </span>
      <span class="enh-star" style="--sx: 71.56%; --sy: 45.29%; --sz: 2.6px; --so: 0.31; --sd: 9.48s; --delay: -8.48s;">
      </span>
      <span class="enh-star" style="--sx: 76.88%; --sy: 72.76%; --sz: 1.3px; --so: 0.59; --sd: 5.50s; --delay: -1.36s;">
      </span>
      <span class="enh-star" style="--sx: 82.68%; --sy: 34.30%; --sz: 1.0px; --so: 0.43; --sd: 8.26s; --delay: -5.02s;">
      </span>
      <span class="enh-star" style="--sx: 74.75%; --sy: 61.50%; --sz: 1.9px; --so: 0.59; --sd: 10.78s; --delay: -4.90s;">
      </span>
    </div>
    <div class="hero-coordinate" aria-hidden="true"> CAPE TOWN, ZA · 33.9° S / 18.4° E </div>
    <div class="hero-art">
      <img src="/design/hero-astronaut.svg" width="1000" height="900" alt="Illustration of Adam Jattiem as an astronaut, with his actual face, beneath a ringed planet.">
      <div class="art-routes" :class="{ shown: mapShown }">
        <a href="#projects" class="route-work">01 <span>The work ↗</span>
        </a>
        <a href="#about" class="route-story">02 <span>The human ↗</span>
        </a>
        <a href="#contact" class="route-contact">05 <span>Say hello ↗</span>
        </a>
      </div>
    </div>
    <div class="hero-copy">
      <p class="eyebrow">
        <span class="hero-cross" aria-hidden="true">+</span> SOFTWARE DEVELOPER / CAPE TOWN </p>
      <h1 id="hero-heading"> BACKEND<br>BRAIN.<br>
        <em>BOUNDLESS<br>CURIOSITY.</em>
      </h1>
      <div class="hero-description">
        <p> I’m Adam Jattiem. I like finding out how things work — then getting them to work better. </p>
        <p>Backend-minded. Full-stack capable. Still asking questions.</p>
      </div>
      <div class="hero-actions">
        <a href="#projects" class="button yellow">See what I’ve built <span aria-hidden="true">↗</span>
        </a>
        <a href="/Adam%20Jattiem%20CV.pdf" target="_blank" rel="noopener noreferrer" class="hero-contact">View my CV <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
    <div class="hero-side-note" aria-hidden="true"> A PERSONAL EXPEDITION INTO SOFTWARE </div>
    <div class="hero-bottom">
      <span>
        <span class="spark" aria-hidden="true">✦</span> THE NEXT CHAPTER STARTS HERE</span>
      <div>
        <button type="button" class="map-toggle" :aria-pressed="mapShown" @click="mapShown = !mapShown">{{ mapShown ? 'Hide the map −' : 'Reveal the map +' }}</button>
        <button type="button" class="motion-toggle" :aria-pressed="motionOff" @click="toggleMotion">Motion {{ motionOff ? 'off' : 'on' }}</button>
      </div>
      <a href="#projects" aria-label="Scroll to selected projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
      </a>
    </div>
  </section>
</template>
