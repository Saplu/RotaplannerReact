import axios from 'axios'
//const baseUrl = 'https://localhost:5001/api/DaycareSelector'
const baseUrl = 'https://rotaplanner.azurewebsites.net/api/DaycareSelector'

const changeDc = async (newDc) => {
    const response = await axios.post(baseUrl, newDc)
    return response.data
}

const getGroups = async(id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getDefaultGroups = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { changeDc, getGroups, getDefaultGroups }