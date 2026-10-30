<script setup>
import { ref } from 'vue'
const formalOpen = ref(true)
const ciscoOpen = ref(false)
</script>

<template>
  <section id="certifications" class="credentials-section section-pad" aria-labelledby="education-heading">
    <div class="wrap">
      <div class="credentials-heading">
        <p class="eyebrow">04 / Education &amp; certifications</p>
        <h2 id="education-heading"> THE STORY<br>IS STILL<br>
          <em>BEING WRITTEN.</em>
        </h2>
        <div class="stamp" aria-hidden="true"> ALWAYS<br>
          <span>LEARNING</span>
          <br>✦ </div>
      </div>
      <div class="credential-group">
        <h3>
          <button type="button" aria-controls="formal-content" :aria-expanded="formalOpen" @click="formalOpen = !formalOpen">
            <span class="group-number">A</span>
            <span>Formal Education &amp; Training<small>Academic foundations and practical development.</small>
            </span>
            <span class="group-plus" aria-hidden="true">{{ formalOpen ? '−' : '+' }}</span>
          </button>
        </h3>
        <div id="formal-content" class="education-tickets" v-show="formalOpen">
          <article class="education-ticket">
            <div class="ticket-top">
              <span>Life Choices Academy / YouthCode</span>
              <span>01</span>
            </div>
            <h4>Full Stack Development</h4>
            <p>YouthCode programme in progress. Completed the April–September 2026 practical training phase in full-stack development, databases, teamwork and real-world projects.</p>
            <dl>
              <div>
                <dt>Timeline</dt>
                <dd>April 2026 – April 2027 · In progress</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>1 year</dd>
              </div>
              <div>
                <dt>NQF level</dt>
                <dd>Not applicable</dd>
              </div>
            </dl>
            <ul class="education-tags" aria-label="Skills covered">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>Vue.js</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MySQL</li>
              <li>Python</li>
              <li>Git &amp; GitHub</li>
            </ul>
          </article>
          <article class="education-ticket">
            <div class="ticket-top">
              <span>International Peace College South Africa</span>
              <span>02</span>
            </div>
            <h4>Higher Certificate in Islamic Studies</h4>
            <dl>
              <div>
                <dt>Timeline</dt>
                <dd>January 2025 – December 2025</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>1 year</dd>
              </div>
              <div>
                <dt>NQF level</dt>
                <dd>5</dd>
              </div>
            </dl>
          </article>
          <article class="education-ticket">
            <div class="ticket-top">
              <span>Darul Islam Islamic High School</span>
              <span>03</span>
            </div>
            <h4>National Senior Certificate (Diploma Pass)</h4>
            <dl>
              <div>
                <dt>Timeline</dt>
                <dd>January 2022 – December 2024</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>3 years</dd>
              </div>
              <div>
                <dt>NQF level</dt>
                <dd>4</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
      <div class="credential-group">
        <h3>
          <button type="button" aria-controls="cisco-content" :aria-expanded="ciscoOpen" @click="ciscoOpen = !ciscoOpen">
            <span class="group-number">B</span>
            <span>Cisco Networking Academy<small>Completed courses and digital credentials.</small>
            </span>
            <span class="group-plus" aria-hidden="true">{{ ciscoOpen ? '−' : '+' }}</span>
          </button>
        </h3>
        <div id="cisco-content" class="certificate-grid" v-show="ciscoOpen">
          <article class="certificate">
            <p class="eyebrow"> Cisco Networking Academy <span class="completed">✓ Completed</span>
            </p>
            <h4>Introduction to Data Science</h4>
            <p>Introductory knowledge of data science concepts and applications.</p>
            <p class="cert-date">Timeline: April 2026 – September 2026</p>
            <a href="https://www.credly.com/badges/cd2bc1b9-5359-41f2-bf49-7bd1b87c09fb/public_url" target="_blank" rel="noopener noreferrer">View Credential <span aria-hidden="true">↗</span>
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
          <article class="certificate">
            <p class="eyebrow"> Cisco Networking Academy <span class="completed">✓ Completed</span>
            </p>
            <h4>Introduction to Cybersecurity</h4>
            <p>Introductory understanding of cybersecurity principles, threats and digital security.</p>
            <p class="cert-date">Timeline: April 2026 – September 2026</p>
            <a href="https://www.credly.com/badges/b436120d-233d-4057-8e5e-eb0761f9d53a/public_url" target="_blank" rel="noopener noreferrer">View Credential <span aria-hidden="true">↗</span>
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
          <article class="certificate">
            <p class="eyebrow">Cisco Networking Academy <span>In progress</span>
            </p>
            <h4>Linux Unhatched</h4>
            <p>Ongoing training, as recorded in my CV.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
