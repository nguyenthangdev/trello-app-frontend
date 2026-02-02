import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updatedData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updatedData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updatedData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updatedData)
  return response.data
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updatedData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updatedData)
  return response.data
}

export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
