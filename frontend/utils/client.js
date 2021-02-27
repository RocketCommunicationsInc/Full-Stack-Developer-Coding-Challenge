import axios from 'axios'
import router from "@/router";
const client =  axios.create({
    withCredentials: true,
    baseURL: '/api'
})

client.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (401 === error.response.status) {

        // Perform Logout
        router.push('/login')
    } else if (419 === error.response.status) {

        // Perform Logout
        router.push('/login')
    } else {
        return Promise.reject(error)
    }
})

export default client
