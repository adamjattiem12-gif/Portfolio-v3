<script setup>
import { computed, ref, inject } from 'vue'
import { projects } from '@/data/projects'
import TechnicalCaseStudies from '@/components/TechnicalCaseStudies.vue'
const selected = ref(0)
const notesOpen = ref(false)
const project = computed(() => projects[selected.value])
const shortNames = ['FoodBoxx', 'Market Pulse', 'ModernTech', 'TutorLink', 'First portfolio']
const coverTitles = ['THE FULL STACK', 'MAKING DATA MAKE SENSE', 'PEOPLE & PROCESSES', 'BETTER TOGETHER', 'THE FIRST CHAPTER']
const { motionOff } = inject('motion')
const stage = ref(null)
let touchOrigin = null
function selectProject(index) {
  const next = (index + projects.length) % projects.length
  if (next === selected.value) return
  selected.value = next
  notesOpen.value = false
  // Animate within a stable grid: no scrollIntoView or animated layout dimensions.
  if (!motionOff.value) {
    stage.value?.querySelector('.project-copy')?.animate(
      [{ opacity: .2, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' },
    )
    stage.value?.querySelector('.screenshot-frame')?.animate(
      [{ opacity: .3, transform: 'translateY(8px) rotate(-1deg)' }, { opacity: 1, transform: 'translateY(0) rotate(-1deg)' }],
      { duration: 450, easing: 'ease-out' },
    )
  }
}
function onKey(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select')) return
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    selectProject(selected.value + (event.key === 'ArrowRight' ? 1 : -1))
  }
}
function touchStart(event) {
  const touch = event.changedTouches[0]
  touchOrigin = { x: touch.clientX, y: touch.clientY }
}
function touchEnd(event) {
  if (!touchOrigin) return
  const touch = event.changedTouches[0]
  const dx = touch.clientX - touchOrigin.x
  const dy = touch.clientY - touchOrigin.y
  touchOrigin = null
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) selectProject(selected.value + (dx < 0 ? 1 : -1))
}
</script>

<template>
  <section id="projects" class="work-section section-pad" aria-labelledby="work-heading" @keydown="onKey">
    <div class="wrap">
      <div class="work-heading">
        <div>
          <p class="eyebrow"><span class="spark">✦</span> 01 / Selected projects</p>
          <h2 id="work-heading">LESS THEORY.<br><em>MORE PROOF.</em></h2>
        </div>
        <p>Team-built applications.<br>Real problems. Plenty of debugging.<br>Here’s what I contributed.</p>
      </div>
      <div class="project-index" aria-label="Choose a project">
        <button v-for="(item, index) in projects" :key="item.id" type="button"
          :aria-pressed="selected === index" aria-controls="project-stage" @click="selectProject(index)">
          <span class="index-node"><span>{{ String(index + 1).padStart(2, '0') }}</span></span>
          <span>{{ shortNames[index] }}</span><span aria-hidden="true" class="index-arrow">↗</span>
        </button>
      </div>
      <article id="project-stage" ref="stage" class="project-stage" :class="'project-' + project.id" aria-labelledby="project-title">
        <div class="project-cover" @touchstart.passive="touchStart" @touchend.passive="touchEnd" @touchcancel="touchOrigin = null">
          <div class="cover-top"><span class="eyebrow">BUILD / {{ String(selected + 1).padStart(2, '0') }}</span><span class="cover-star" aria-hidden="true">✶</span></div>
          <p class="cover-title" aria-hidden="true">{{ coverTitles[selected] }}</p>
          <div class="screenshot-frame">
            <span class="frame-caption">{{ shortNames[selected] }} / Application view</span>
            <img :src="project.image" :alt="project.alt" :width="project.imageWidth" :height="project.imageHeight" loading="lazy">
          </div>
          <div class="cover-bottom"><span>YOUTHCODE / LIFE CHOICES ACADEMY</span><span aria-hidden="true">+ + +</span></div>
        </div>
        <div class="project-copy">
          <p class="eyebrow">{{ project.type }}</p>
          <h3 id="project-title">{{ project.title }}</h3>
          <p class="project-intro">{{ project.intro }}</p>
          <ul class="tech-list" aria-label="Project technologies"><li v-for="tech in project.tech" :key="tech">{{ tech }}</li></ul>
          <div class="project-links">
            <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
              :class="link.label === 'Live Demo' ? 'button yellow' : 'text-link'">
              {{ link.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <button class="notes-toggle" type="button" :aria-expanded="notesOpen" aria-controls="build-notes" @click="notesOpen = !notesOpen">
            <span>Read the build notes</span><span aria-hidden="true">{{ notesOpen ? '−' : '+' }}</span>
          </button>
        </div>
        <div v-show="notesOpen" id="build-notes" class="build-notes">
          <div><p class="eyebrow">Behind the build</p><h4>The details matter.</h4></div>
          <div>
            <p v-for="paragraph in project.description" :key="paragraph">{{ paragraph }}</p>
            <p v-if="project.team" class="team-credit"><strong>Team</strong><br>{{ project.team }}</p>
          </div>
        </div>
      </article>
      <div class="project-pagination">
        <span role="status" aria-live="polite">{{ shortNames[selected] }} · {{ selected + 1 }} of {{ projects.length }}</span>
        <div>
          <button type="button" aria-label="Previous project" @click="selectProject(selected - 1)">←</button>
          <button type="button" aria-label="Next project" @click="selectProject(selected + 1)">→</button>
        </div>
      </div>
      <TechnicalCaseStudies />
    </div>
  </section>
</template>
