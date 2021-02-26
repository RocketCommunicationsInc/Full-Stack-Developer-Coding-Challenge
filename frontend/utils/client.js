import axios from 'axios'

const client =  axios.create({
    withCredentials: true,
    baseURL: '/api'
})

export default client
