<script setup>
import { computed, ref } from 'vue'
import { skills } from '@/data/skills'
const selected = ref(0)
const current = computed(() => skills[selected.value])
const proofs = [
  { label: 'REAL PROJECTS /', links: [{ text: 'FoodBoxx API', href: '#technical-case-studies' }, { text: 'Market Pulse scrapers', href: '#technical-case-studies' }] },
  { label: 'PROJECTS /', links: [{ text: 'Vue dashboard', href: '#projects' }, { text: 'FoodBoxx interface', href: '#projects' }] },
  { label: 'IN PRACTICE /', links: [{ text: 'Team collaboration', href: '#projects' }, { text: 'Project repos', href: '#projects' }] },
]
</script>

<template>
  <section id="skills" class="skills-section section-pad" aria-labelledby="skills-heading">
    <div class="wrap skill-layout">
      <div class="skill-intro">
        <p class="eyebrow">03 / The toolkit</p>
        <h2 id="skills-heading"> GOOD PARTS.<br>
          <em>BETTER<br>TOGETHER.</em>
        </h2>
        <p> What I’ve been learning and using.<br>No percentages. The projects tell the story. </p>
        <div class="skill-select" aria-label="Explore skill groups">
          <button v-for="(skill, index) in skills" :key="skill.name" type="button" :aria-pressed="selected === index" aria-controls="skill-explanation" @click="selected = index">
            <span>0{{ index + 1 }}</span>{{ skill.name }}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <div class="skill-machine">
        <div class="machine-caption">
          <span>APPLICATION ANATOMY</span>
          <span aria-hidden="true">✳</span>
          <span>THREE CONNECTED LAYERS</span>
        </div>
        <div class="skill-layers">
          <div v-for="(skill, index) in skills" :key="skill.name" class="skill-layer" :class="{ selected: selected === index }">
            <span class="layer-id">0{{ index + 1 }}</span>
            <div>
              <h3>{{ skill.name }}</h3>
              <ul>
                <li v-for="tag in skill.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
            <span class="layer-symbol" aria-hidden="true">{{ ['{ }', '&lt;/&gt;', '↗'][index] }}</span>
          </div>
        </div>
        <div id="skill-explanation" class="skill-explanation" aria-live="polite">
          <h3>{{ current.title }}</h3>
          <p>{{ current.text }}</p>
          <p class="skill-example">{{ current.example }}</p>
          <p class="enh-skill-proof">
            <span>{{ proofs[selected].label }}</span>
            <a v-for="link in proofs[selected].links" :key="link.text" :href="link.href">{{ link.text }}</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
