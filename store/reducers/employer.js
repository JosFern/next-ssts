import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const EmployerStore = createSlice({
    name: 'employers',
    initialState: {
        employers: [],
        employer: {}
    },
    reducers: {
        setEmployers: (state, action) => {
            state.employers = action.payload
        },

        setEmployer: (state, action) => {
            state.employer = { ...state.employer, ...action.payload }
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