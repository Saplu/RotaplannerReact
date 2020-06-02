import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/ShiftWishes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postWish = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default {getAll, postWish}