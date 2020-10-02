import axios from 'axios'
const baseUrl = 'https://localhost:5001/api/DCShifts'
//const baseUrl = 'https://rotaplanner.azurewebsites.net/api/DCShifts'

const getShifts = async (dc, group, creator, set = 'default', up = 0) => {
  const response = await axios.get(`${baseUrl}/${dc}/${group}/${creator}/${set}/${up}`)
  return response.data
}

export default {getShifts}