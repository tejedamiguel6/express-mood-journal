import axios from 'axios'

const API_URL = '/api/mood/'

const createMood = async (moodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, moodData, config)

  return response.data
}

const getMoods = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const moodService = {
  createMood,
  getMoods,
}

export default moodService
