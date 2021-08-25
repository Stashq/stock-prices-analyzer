import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: "/home",
        name: "Home",
        alias: '/',
        component: () =>
            import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
    {
        path: "/tables",
        name: "Tables",
        component: () =>
            import(/* webpackChunkName: "tables" */ "../views/Tables.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/singin",
        name: "SingIn",
        component: () =>
            import(/* webpackChunkName: "singin" */ "../views/SingIn.vue"),
    },
    {
        path: "/singout",
        name: "SingOut",
        component: () =>
            import(/* webpackChunkName: "singout" */ "../views/SingOut.vue"),
    },
    {
        path: "*",
        name: "PageNotFound",
        component: () =>
            import(/* webpackChunkName: "pagenotfound" */ "../views/PageNotFound.vue"),
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to?.meta?.requiresAuth && token) {
        const config = {
            headers: {
                accept: "application/json",
                Authorization: token,
            }
        }
        axios.get("http://127.0.0.1:8000/users/me", config)
            .then(() => {
                next();
            })
            .catch((err) => {
                if (!err.response || err.response.status == 500) {
                    // network error
                    alert("Internal server error. Please try later.");
                }
                else if (err?.response?.status && err.response.status === 401) {
                    localStorage.removeItem("token");
                    next({ name: "Login" });
                }
            });
    } else if (to?.meta?.requiresAuth && !token) {
        next({ name: "Login" });
    } else {
        next();
    }
});

export default router;
