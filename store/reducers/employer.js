import { createSlice } from '@reduxjs/toolkit';
import { differenceInDays, formatISO, getMonth, isSameMonth, parseISO } from 'date-fns'
import _ from 'lodash';

export const EmployerStore = createSlice({
    name: 'employers',
    initialState: {
        employers: [
            //sample employee data
            {
                accountID: 3,
                firstName: 'employer1',
                lastName: 'employer',
                email: 'employer1@gmail.com',
                company: 1,
            },
            {
                accountID: 4,
                firstName: 'employer2',
                lastName: 'employer',
                email: 'employer2@gmail.com',
                company: 3,
            }
        ],
    },
    reducers: {
        setEmployers: (state, action) => {
            state.employers = action.payload
        },

        addEmployer: (state, action) => {
            state.employers = [...state.employers, action.payload]
        },

        deleteEmployer: (state, action) => {
            state.employers.splice(action.payload, 1)
        }
    }
})

export const { setEmployers, addEmployer, deleteEmployer } = EmployerStore.actions

export default EmployerStore.reducer