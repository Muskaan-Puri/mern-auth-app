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
        }
    }
})

export const { signinFailure, signinStart, signinSuccess } = userSlice.actions
export default userSlice.reducer