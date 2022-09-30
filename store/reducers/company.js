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
        ],
        company: {
            id: 0,
            name: '',
            leaves: 0,
            accountID: 0,
            overtimeLimit: 0
        }
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload
        },

        setCompany: (state, action) => {
            const index = _.findIndex(state.companies, { accountID: action.payload })

            state.company = { ...state.companies[index] }

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