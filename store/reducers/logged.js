import { createSlice } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const loggedStore = createSlice({
    name: 'logged',
    initialState: {
        loggedIn: {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            token: ''
        }
    },
    reducers: {
        setLogged: (state, action) => {
            const { id, firstName, lastName, email, role } = action.payload
            state.loggedIn = { ...state.loggedIn, id, firstName, lastName, email, role }
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer