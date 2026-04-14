import { createRouter, createWebHistory } from "vue-router"
import home from "@/views/home.vue"
import message from "@/views/message.vue"

const routes = [
   { path: '/', component: home },
   { path: '/messages', component: message, meta: { requiresAuth: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLogged') === 'true'
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/')
    } else {
        next()
    }
})

export default router