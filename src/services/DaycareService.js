import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/DaycareSelector'

const changeDc = async (newDc) => {
    const response = await axios.post(baseUrl, newDc)
    return response.data
}

export default { changeDc }