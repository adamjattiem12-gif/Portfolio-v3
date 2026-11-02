import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    // Keep existing URLs useful while presenting every section on one page.
    ...['skills', 'projects', 'about', 'contact', 'education', 'certifications'].map((section) => ({
      path: `/${section}`,
      redirect: { path: '/', hash: `#${section === 'education' ? 'certifications' : section}` },
    })),
  ],
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return { ...savedPosition, behavior: 'instant' }
    if (to.hash) {
      // Wait for layout only on the initial load, not on every section click.
      if (!from.matched.length) await document.fonts.ready
      const section = document.getElementById(to.hash.slice(1))
      if (section) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 86
        return {
          top: section.getBoundingClientRect().top + window.scrollY - headerHeight,
          behavior: !from.matched.length || document.documentElement.classList.contains('motion-disabled') || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        }
      }
    }
    return { top: 0 }
  },
})

export default router
