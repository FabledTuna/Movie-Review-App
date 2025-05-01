import Axios from 'axios'

const laravelApiClient = Axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default laravelApiClient