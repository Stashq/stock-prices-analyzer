import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue"),
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
    }
    else {
        next();
    }
});

export default router;
