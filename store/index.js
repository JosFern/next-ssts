import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employee';
import companyReducer from './reducers/company';
import accountReducer from './reducers/account';
import leaveReducer from './reducers/leaves';
import absencesReducer from './reducers/absences';
import overtimeReducer from './reducers/overtime';
import loggedReducer from './reducers/logged';
import employerReducer from './reducers/employer'

export default configureStore({
    reducer: {
        employee: employeeReducer,
        company: companyReducer,
        account: accountReducer,
        leaves: leaveReducer,
        absences: absencesReducer,
        overtime: overtimeReducer,
        logged: loggedReducer,
        employer: employerReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false
    // })
})