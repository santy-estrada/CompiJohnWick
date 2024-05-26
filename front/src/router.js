import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/login.vue";
import Register from "./components/register.vue";
import Dashboard from "./components/dashboard.vue";
import Rules from "./components/rules.vue"
import Sanction from "./components/sanctions.vue"
import Conflicts from "./components/conflicts.vue"
import Missions from "./components/missions.vue"

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path:"/rules",
        name:"Rules",
        component: Rules,
    },
    {
        path: "/sanctions",
        name: "Sanctions",
        component: Sanction,
    },
    {
        path: "/conflicts",
        name: "Conflicts",
        component: Conflicts,
    },
    {
        path: "/missions",
        name: "Missions",
        component: Missions,
    }

   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
