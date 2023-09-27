import axios from "../utils/request"
// import axios from "axios"

const base = {
    // baseUrl: "http://localhost:8080",
    baseUrl: "/api",
    register: "/api/register"
}

const api = {
    register(params) {
        return axios.post(base.baseUrl + base.register, params);
    }
}

export default api;