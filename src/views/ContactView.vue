<script setup>
import { onUnmounted, reactive, ref } from 'vue'
const fields = reactive({ name: '', surname: '', email: '', message: '' })
const form = ref(null)
const busy = ref(false)
const status = ref('')
const statusKind = ref('')
let controller
let timeout
async function submit() {
  if (busy.value || !form.value.reportValidity()) return
  busy.value = true
  status.value = 'Sending securely through Formspree...'
  statusKind.value = 'sending'
  controller = new AbortController()
  timeout = setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch('https://formspree.io/f/mgoqgngy', {
      method: 'POST', body: new FormData(form.value),
      headers: { Accept: 'application/json' }, signal: controller.signal,
    })
    if (!response.ok) {
      let message = 'The message could not be sent. Please try again.'
      const body = await response.json().catch(() => null)
      if (Array.isArray(body?.errors)) message = body.errors.map(e => e.message).filter(Boolean).join(' ') || message
      throw new Error(message)
    }
    statusKind.value = 'success'
    status.value = 'Message sent successfully. Thank you for reaching out!'
    Object.keys(fields).forEach(key => { fields[key] = '' })
  } catch (error) {
    statusKind.value = 'error'
    status.value = error.name === 'AbortError'
      ? 'The request timed out. Your message is kept; please retry.'
      : `${error.message || 'Unable to send right now.'} Your message is kept so you can retry.`
  } finally {
    clearTimeout(timeout)
    busy.value = false
  }
}
onUnmounted(() => { clearTimeout(timeout); controller?.abort() })
</script>

<template>
  <section id="contact" class="contact-section section-pad" aria-labelledby="contact-heading">
    <div class="wrap contact-layout">
      <div class="contact-copy">
        <p class="eyebrow">05 / The next connection</p>
        <h2 id="contact-heading">GOT<br>SOMETHING<br>
          <em>GOOD?</em>
        </h2>
        <p> A role, a project, a good technical question.<br>I’m listening. <br>
          <a href="mailto:adamjattiem12@gmail.com" class="contact-email">adamjattiem12@gmail.com ↗</a>
        </p>
        <img src="/design/contact-telescope.svg" width="600" height="450" loading="lazy" alt="Original ink illustration of a radio telescope receiving a signal">
      </div>
      <div class="contact-form-wrap">
        <div class="form-top">
          <span>DIRECT LINE / ADAM</span>
          <span aria-hidden="true">↗</span>
        </div>
        <h3>Start with hello.</h3>
        <form action="https://formspree.io/f/mgoqgngy" method="POST" @submit.prevent="submit" ref="form">
          <div class="form-row">
            <div class="field">
              <label for="name">Name <span>*</span>
              </label>
              <input id="name" name="name" type="text" autocomplete="given-name" required="" placeholder="Your first name" v-model="fields.name">
            </div>
            <div class="field">
              <label for="surname">Surname <span>*</span>
              </label>
              <input id="surname" name="surname" type="text" autocomplete="family-name" required="" placeholder="Your surname" v-model="fields.surname">
            </div>
          </div>
          <div class="field">
            <label for="email">Email <span>*</span>
            </label>
            <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="you@example.com" v-model="fields.email">
          </div>
          <div class="field">
            <label for="message">What’s on your mind?</label>
            <textarea id="message" name="message" rows="5" placeholder="A few details are a good place to start." v-model="fields.message" required="" maxlength="10000">
            </textarea>
          </div>
          <button type="submit" class="button yellow" :disabled="busy">{{ busy ? 'Sending message…' : 'Send a message' }} <span aria-hidden="true">↗</span>
          </button>
          <p class="required-note">* Required fields</p>
          <p class="enh-form-status" role="status" aria-live="polite" :data-kind="statusKind">{{ status }}</p>
        </form>
      </div>
    </div>
  </section>
</template>
