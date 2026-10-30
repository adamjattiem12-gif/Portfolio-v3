<script setup>
import { reactive } from 'vue'
import { caseStudies } from '@/data/caseStudies'
const selectedLayers = reactive(Object.fromEntries(caseStudies.map(item => [item.slug, 0])))
function nodeX(item, index) {
  const gap = item.labels.length === 3 ? 85 : 22
  const total = item.labels.length * 178 + (item.labels.length - 1) * gap
  return (820 - total) / 2 + index * (178 + gap)
}
</script>

<template>
  <div id="technical-case-studies" class="enh-case-zone">
    <span class="enh-case-kicker">Architecture notes / optional deep dive</span>
    <div class="enh-case-heading">
      <h3>UNDER THE <em>HOOD.</em></h3>
      <p>Real engineering decisions, actual contributions and diagrams grounded in the project repositories.</p>
    </div>
    <details v-for="item in caseStudies" :key="item.slug" class="enh-case-item">
      <summary>
        <span class="enh-case-index">{{ item.num }}</span>
        <span><strong>{{ item.name }} — engineering breakdown</strong><small>{{ item.subtitle }} · expand to inspect verified layers</small></span>
        <span class="enh-case-plus" aria-hidden="true">+</span>
      </summary>
      <div class="enh-case-body">
        <div class="enh-case-overview">
          <div class="enh-case-field"><span>Objective / why it exists</span><p>{{ item.objective }}</p><span>My contribution</span><p>{{ item.role }}</p></div>
          <div class="enh-case-field"><span>Actual technologies</span><ul><li v-for="tech in item.technologies" :key="tech">{{ tech }}</li></ul><span>Architecture / verification</span><p>{{ item.decisions }}</p></div>
        </div>
        <div class="enh-architecture">
          <div class="enh-architecture-top"><span>SYSTEM / INTERACTIVE LAYER VIEW</span><span>SELECT A COMPONENT BELOW</span></div>
          <div class="enh-diagram-scroll">
            <svg viewBox="0 0 820 150" role="group" :aria-label="item.name + ' architecture: select a component to inspect it'">
              <g v-for="(_, index) in item.labels.slice(0, -1)" :key="'line-' + index" aria-hidden="true">
                <path class="enh-diagram-line" :d="`M${nodeX(item, index) + 185} 84 H${nodeX(item, index + 1) - 8}`" />
                <path fill="#e6fc4d" :d="`M${nodeX(item, index + 1) - 8} 84 l-9 -6 v12 z`" />
              </g>
              <g v-for="(label, index) in item.labels" :key="label" class="enh-diagram-group" :class="{ active: selectedLayers[item.slug] === index }"
                role="button" tabindex="0" :aria-label="label" :aria-pressed="selectedLayers[item.slug] === index"
                @click="selectedLayers[item.slug] = index" @keydown.enter.prevent="selectedLayers[item.slug] = index" @keydown.space.prevent="selectedLayers[item.slug] = index">
                <rect class="enh-diagram-box" :x="nodeX(item, index)" y="38" width="178" height="90" rx="2" />
                <text :x="nodeX(item, index) + 89" y="70" class="enh-diagram-title">{{ label }}</text>
                <text :x="nodeX(item, index) + 89" y="97" class="enh-diagram-label">{{ item.subs[index] }}</text>
              </g>
            </svg>
          </div>
          <div class="enh-architecture-legend">
            <button v-for="(label, index) in item.labels" :key="label" type="button" :aria-pressed="selectedLayers[item.slug] === index" @click="selectedLayers[item.slug] = index">
              {{ String(index + 1).padStart(2, '0') }} / {{ label }}
            </button>
          </div>
          <p class="enh-layer-info" role="status" aria-live="polite">{{ item.descriptions[selectedLayers[item.slug]] }}</p>
        </div>
        <div class="enh-case-notes">
          <div class="enh-case-field"><span>Challenge / approach</span><p>{{ item.challenge }}</p></div>
          <div class="enh-case-field"><span>Result / scope</span><p>{{ item.outcome }}</p></div>
        </div>
        <div class="enh-case-foot"><a :href="item.demo" target="_blank" rel="noopener noreferrer">Live project ↗</a><a :href="item.repo" target="_blank" rel="noopener noreferrer">View source ↗</a></div>
      </div>
    </details>
  </div>
</template>
