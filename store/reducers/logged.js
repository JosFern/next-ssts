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
            const { id, firstName, email, role } = action.payload
            state.loggedIn = { ...state.loggedIn, id, firstName, email, role }
        },
    }
})

export const { setLogged } = loggedStore.actions

export default loggedStore.reducer