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
            const index = _.findIndex(state.employers, { accountID: action.payload })
            state.employers.splice(index, 1)
        },

        updateEmployer: (state, action) => {
            const { firstName, lastName, email, company, id } = action.payload

            const index = _.findIndex(state.employers, { accountID: id })

            state.employers[index] = { ...state.employers[index], firstName, lastName, email, company }

        },

        deleteEmployers: (state, action) => {
            const updateEmployers = _.filter(state.employers, emp => action.payload.includes(emp.accountID) ? false : true)

            state.employers = [...updateEmployers]
        }
    }
})

export const { setEmployers, addEmployer, deleteEmployer, updateEmployer, deleteEmployers } = EmployerStore.actions

export default EmployerStore.reducer