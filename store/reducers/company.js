import { createSlice } from '@reduxjs/toolkit';

export const CompanyStore = createSlice({
    name: 'company',
    initialState: {
        companies: [
            {
                id: 1,
                name: 'Syntactics',
                leaves: 6,
                accountID: 1,
                overtimeLimit: 30
            },
            {
                id: 3,
                name: 'Lemondrop',
                leaves: 6,
                accountID: 3,
                overtimeLimit: 30
            }
        ]
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload
        },

        addCompany: (state, action) => {
            state.companies = [...state.companies, action.payload]
        },

        deleteCompany: (state, action) => {
            state.companies.splice(action.payload, 1)
        }
    }
})

export const { setCompanies, addCompany, deleteCompany } = CompanyStore.actions

export default CompanyStore.reducer