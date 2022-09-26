import { createSlice } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const loggedStore = createSlice({
    name: 'logged',
    initialState: {
        loggedIn: {
            id: 1,
            firstName: 'Joselito',
            email: 'joselito@gmail.com',
            role: 'employee'
        }
    },
    reducers: {
        setLogged: (state, action) => {
            state.loggedIn = action.payload
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer