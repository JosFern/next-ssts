import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const AccountStore = createSlice({
    name: 'account',
    initialState: {
        accounts: []
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