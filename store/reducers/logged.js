import { createSlice } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

export const loggedStore = createSlice({
    name: 'logged',
    initialState: {
        loggedIn: {
            id: 0,
            firstName: '',
            email: '',
            role: ''
        }
    },
    reducers: {
        setLogged: (state, action) => {
            const { id, firstName, email, role } = action.payload
            state.loggedIn = { ...state.loggedIn, id, firstName, email, role }
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer