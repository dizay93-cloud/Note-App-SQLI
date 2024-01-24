import { createRouter, createWebHistory } from 'vue-router'
import NoteList from '../components/NoteList.vue'
import NoteEditor from '../components/noteEditor.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/noteList',
      name: 'list',
      component: NoteList
    },
    {
      path: '/editor/edit/:id',
      name: 'edit',
      component: NoteEditor
    },
    {
      path: '/editor/new',
      name: 'new',
      component: NoteEditor
    }
  ]
})

export default router
