import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/ShiftWishes'
//const baseUrl = 'https://rotaplanner.azurewebsites.net/api/ShiftWishes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const wishes = response.data
  return wishes
}

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

const deleteWish = async wish => {
  const response = await axios.delete(`${baseUrl}/${wish.creator}/${wish.set}/${wish.day}/${wish.shift}/${wish.empId}`)
  return response.data
}

const deleteSet = async (creator, set) => {
  const response = await axios.delete(`${baseUrl}/${creator}/${set}`)
  return response.data
}

export default {getAll, getSpecific, postWish, deleteWish, deleteSet}