import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const AccountStore = createSlice({
    name: 'account',
    initialState: {
        accounts: [
            //sample account data
            {
                accountID: 1,
                firstName: 'Employee',
                email: 'employee@gmail.com',
                password: 'employee123',
                type: 'employee'
            },
            {
                accountID: 2,
                firstName: 'Admin',
                email: 'admin@gmail.com',
                password: 'admin123',
                type: 'admin'
            },
            {
                accountID: 3,
                firstName: 'Employer1',
                email: 'employer1@gmail.com',
                password: 'employer123',
                type: 'employer'
            },
            {
                accountID: 4,
                firstName: 'Employer2',
                email: 'employer2@gmail.com',
                password: 'employer123',
                type: 'employer'
            }
        ]
    },
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload
        },

        addAccount: (state, action) => {
            state.accounts = [...state.accounts, action.payload]
        },

        deleteAccount: (state, action) => {
            const index = _.findIndex(state.accounts, { accountID: action.payload })
            state.accounts.splice(index, 1)
        },

        updateAccount: (state, action) => {
            const { firstName, email, password, id } = action.payload

            const index = _.findIndex(state.accounts, { accountID: id })

            state.accounts[index] = { ...state.accounts[index], firstName, email, password }
        }
    }
})

export const { setAccounts, addAccount, deleteAccount, updateAccount } = AccountStore.actions

export default AccountStore.reducer