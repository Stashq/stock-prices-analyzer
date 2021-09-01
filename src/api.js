import axios from "axios";
import router from "./router";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        accept: "application/json",
    },
});

api.defaults.headers.common["Authorization"] = localStorage.getItem("token");

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async function (err) {
        if (!err.response) {
            // network error
            alert("Internal server error. Please try later.");
            return Promise.reject(err);
        } else if (err.response.status === 401) {
            api.defaults.headers.common["Authorization"] = null;
            localStorage.removeItem("token");
            try{
                await router.push("/login");
                return Promise.reject(err);
            }
            catch {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
);

export default api;
