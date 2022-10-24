import { createSlice } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const loggedStore = createSlice({
    name: 'logged',
    initialState: {
        loggedIn: {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            token: ''
        }
    },
    reducers: {
        setLogged: (state, action) => {
            const { id, firstname, lastname, email, role, token } = action.payload
            state.loggedIn = { ...state.loggedIn, id, firstname, lastname, email, role, token }
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer