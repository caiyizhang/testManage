import Vue from 'vue'
import Axios from 'axios'

// var root = process.env.API_ROOT
// Axios.defaults.baseURL = process.env.API_ROOT

const axiosInstance = Axios.create({
    withCredentials: true
})
axiosInstance.defaults.baseURL = process.env.API_ROOT


axiosInstance.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    const regex = /.*csrftoken=([^;.]*).*$/
    config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
    return config
})


axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

Vue.prototype.axios = axiosInstance


export default axiosInstance
