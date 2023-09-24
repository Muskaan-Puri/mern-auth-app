import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    error: false,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
            state.error = false
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signinFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        updateUserStart: (state) => {
            state.loading = true
            state.error = false
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        deleteUserStart: (state) => {
            state.loading = true
            state.error = false
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = false
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { signinFailure, signinStart, signinSuccess, updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } = userSlice.actions
export default userSlice.reducer