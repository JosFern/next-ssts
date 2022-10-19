import { createSlice } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const loggedStore = createSlice({
    name: 'logged',
    initialState: {
        loggedIn: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            token: ''
        }
    },
    reducers: {
        setLogged: (state, action) => {
            const { id, firstName, lastName, email, role, token } = action.payload
            state.loggedIn = { ...state.loggedIn, id, firstName, lastName, email, role, token }
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer