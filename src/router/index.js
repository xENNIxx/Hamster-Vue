import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('../views/PlaygroundView.vue')
  },
  {
    path: '/build',
    name: "Build",
    component: () => import('../views/BuildTerrainView.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CoursesView.vue')
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('../views/ActivityView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  // teacher specific routes
  // TODO: better nameing-scheme
  {
    path: '/teachers/courses/new',
    name: 'teachers_courses_create',
    component: () => import('../views/teacherViews/CoursesCreateView.vue')
  },
  {
    path: '/teachers/courses',
    name: 'teacher_courses',
    component: () => import('../views/teacherViews/MyCoursesView.vue')
  },
  {
    path: '/teachers/courses/:id',
    name: 'teacher_courses_detail',
    component: () => import('../views/teacherViews/CoursesDetailView.vue')
  },
  {
    path: '/teachers/courses/:id/activities',
    name: 'teacher_courses_activities',
    component: () => import('../views/teacherViews/CoursesActivityView.vue')
  },
  // {
  //   path: '/teachers/courses/:id/activities/:actId',
  //   name: 'teacher_courses_activities_update',
  //   component: () => import('../views/teacherViews/CoursesActivityView.vue')
  // },
  {
    path: '/teachers/courses/:id/correct/:solId',
    name: 'teacher_courses_correct',
    component: () => import('../views/teacherViews/CorrectActivityView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
