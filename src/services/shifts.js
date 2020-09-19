import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/DCShifts'
//const baseUrl = 'https://rotaplanner.azurewebsites.net/api/DCShifts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getShifts = (dc, group, creator = 'saplu', set = 'default', up = 0) => {
  const request = axios.get(`${baseUrl}/${dc}/${group}/${creator}/${set}/${up}`)
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

export default {getAll, getShifts, postData, clearGroups}