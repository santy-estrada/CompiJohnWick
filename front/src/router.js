import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/login.vue";
import Register from "./components/register.vue";
import Dashboard from "./components/dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        conponent: Dashboard,
    },
   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
