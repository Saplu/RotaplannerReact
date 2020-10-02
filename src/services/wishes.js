import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/ShiftWishes'
//const baseUrl = 'https://rotaplanner.azurewebsites.net/api/ShiftWishes'

const getSpecific = async (creator, set) => {
  const response = await axios.get(`${baseUrl}/${creator}/${set}`)
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

const deleteSet = async (creator, set) => {
  const response = await axios.delete(`${baseUrl}/${creator}/${set}`)
  return response.data
}

export default {getSpecific, postWish, deleteWish, deleteSet}