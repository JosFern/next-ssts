import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const AccountStore = createSlice({
    name: 'account',
    initialState: {
        accounts: [
            //sample account data
            {
                accountID: 1,
                email: 'employee@gmail.com',
                password: 'employee123',
                type: 'employee'
            },
            {
                accountID: 2,
                email: 'admin@gmail.com',
                password: 'admin123',
                type: 'admin'
            },
            {
                accountID: 3,
                email: 'employer1@gmail.com',
                password: 'employer123',
                type: 'employer'
            },
            {
                accountID: 4,
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
            state.accounts.splice(action.payload, 1)
        }
    }
})

export const { setAccounts, addAccount, deleteAccount } = AccountStore.actions

export default AccountStore.reducer