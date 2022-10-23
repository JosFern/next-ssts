import { createSlice } from '@reduxjs/toolkit';

export const CompanyStore = createSlice({
    name: 'company',
    initialState: {
        companies: [],
        company: {
            id: 0,
            name: '',
            allocateLeaves: 0,
            allocateOvertime: 0
        }
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload
        },

        setCompany: (state, action) => {
            const { id, name, allocateLeaves, allocateOvertime } = action.payload

            state.company = { ...state.company, id, name, allocateLeaves, allocateOvertime }
        },

        addCompany: (state, action) => {
            state.companies = [...state.companies, action.payload]
        },

        deleteCompany: (state, action) => {
            const index = _.findIndex(state.companies, { accountID: action.payload })

            state.companies.splice(index, 1)
        },

        updateCompany: (state, action) => {
            const { name, leaves, overtimeLimit, id } = action.payload

            const index = _.findIndex(state.companies, { accountID: id })

            state.companies[index] = { ...state.companies[index], name, leaves, overtimeLimit }
        }
    }
})

export const { setCompanies, setCompany, addCompany, deleteCompany, updateCompany } = CompanyStore.actions

export default CompanyStore.reducer