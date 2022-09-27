import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employee';
import companyReducer from './reducers/company';
import accountReducer from './reducers/account';
import leaveReducer from './reducers/leaves';
import absencesReducer from './reducers/absences';
import overtimeReducer from './reducers/overtime';
import loggedReducer from './reducers/logged';
import employerReducer from './reducers/employer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'persist',
    storage
}

const reducer = combineReducers({
    employee: employeeReducer,
    company: companyReducer,
    account: accountReducer,
    leaves: leaveReducer,
    absences: absencesReducer,
    overtime: overtimeReducer,
    logged: loggedReducer,
    employer: employerReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})

// export default () => {
//     let store = configureStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

// export default configureStore({
//     reducer: {
//         employee: employeeReducer,
//         company: companyReducer,
//         account: accountReducer,
//         leaves: leaveReducer,
//         absences: absencesReducer,
//         overtime: overtimeReducer,
//         logged: loggedReducer,
//         employer: employerReducer
//     },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false
    // })
// })