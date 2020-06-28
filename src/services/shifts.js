import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/DCShifts'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getDefault = (group) => {
    const request = axios.get(`${baseUrl}/${group}`)
    return request.then(response => response.data)
}

const postData = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const clearGroups = async() => {
    const response = await axios.delete(baseUrl)
    return response.data
}

export default {getAll, getDefault, postData, clearGroups}