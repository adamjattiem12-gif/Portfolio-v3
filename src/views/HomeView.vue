<script setup>
import HeroSection from '@/components/HeroSection.vue'
import ProjectsView from './ProjectsView.vue'
import AboutView from './AboutView.vue'
import SkillsView from './SkillsView.vue'
import EducationView from './EducationView.vue'
import ContactView from './ContactView.vue'
</script>

<template>
  <HeroSection />
  <div class="chapter-strip" aria-hidden="true"><span>CURIOUS BY NATURE</span><span>✶</span><span>PRECISE BY PRACTICE</span><span>✶</span><span>BUILT IN CAPE TOWN</span><span>✶</span></div>
  <ProjectsView />
  <AboutView />
  <SkillsView />
  <EducationView />
  <ContactView />
</template>
