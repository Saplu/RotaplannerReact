import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/DaycareSelector'
//const baseUrl = 'https://rotaplanner.azurewebsites.net/api/DaycareSelector'

const getGroups = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getGroups }