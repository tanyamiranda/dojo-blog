import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import EditPostView from '@/views/EditPostView.vue'
import SpinnerTester from '@/views/SpinnerTester.vue'

const routes = [
  {
    path: '/:tag?',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/filter/:tag?',
    name: 'filterHome',
    component: HomeView,
    props: true
  },
  {
    path: '/add-post',
    name: 'CreatePostView',
    component: CreatePostView
  },
  {
    path: '/edit-post/:id',
    name: 'EditPostView',
    component: EditPostView,
    props: true
  },
  {
    path: '/spinner',
    name: 'SpinnerTester',
    component: SpinnerTester
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
