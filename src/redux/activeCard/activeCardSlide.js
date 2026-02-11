import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const activeCardSlide = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null,
      state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {}
})

export const { showModalActiveCard, clearAndHideCurrentActiveCard, updateCurrentActiveCard } = activeCardSlide.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export const activeCardReducer = activeCardSlide.reducer