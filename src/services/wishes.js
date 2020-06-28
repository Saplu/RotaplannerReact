import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/ShiftWishes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    const wishes = response.data
    return wishes
}

const postWish = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    const wish = response.data
    return wish
}

const deleteWish = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const deleteAll = async() => {
    const response = await axios.delete(baseUrl)
    return response.data
}

export default {getAll, postWish, deleteWish, deleteAll}