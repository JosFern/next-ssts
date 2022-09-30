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
                firstName: 'employer1',
                email: 'employer1@gmail.com',
                password: 'employer123',
                type: 'employer'
            },
            {
                accountID: 4,
                firstName: 'employer2',
                email: 'employer2@gmail.com',
                password: 'employer123',
                type: 'employer'
            },
            {
                accountID: 5,
                firstName: 'jose',
                email: 'jose@gmail.com',
                password: 'jose123',
                type: 'employee'
            },
            {
                accountID: 6,
                firstName: 'Joselito',
                email: 'joselito@gmail.com',
                password: 'joselito123',
                type: 'employee'
            },
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
        },

        deleteAccounts: (state, action) => {
            const updateAccounts = _.filter(state.accounts, acc => action.payload.includes(acc.accountID) ? false : true)

            state.accounts = [...updateAccounts]
        }
    }
})

export const { setAccounts, addAccount, deleteAccount, updateAccount, deleteAccounts } = AccountStore.actions

export default AccountStore.reducer