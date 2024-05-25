import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import DocsView from '../views/docs/DocsView.vue'
import ComponentsView from '../views/components/ComponentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/docs',
      name: 'documentation',
      component: DocsView
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsView
    }
  ]
})

export default router
