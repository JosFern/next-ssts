import { createSlice } from '@reduxjs/toolkit';
import { parseISO, isSameMonth, differenceInDays } from 'date-fns';
import _ from 'lodash'

export const Absences = createSlice({
    name: 'absences',
    initialState: {
        employee: {
            totalAbsences: 0,
        },
        absences: []
    },
    reducers: {
        setAbsences: (state, action) => {
            state.absences = action.payload
        },

        setTotalAbsences: (state, action) => {
            const { totalAbsences } = action.payload

            state.employee.totalAbsences = totalAbsences
        },

        //---------------------------------------------------------
        addAbsent: (state, action) => {
            state.absences.push(action.payload)
        },

        computeTotalAbsences: (state, action) => {
            const { id, leaves, companyLeaves } = action.payload

            const employeeAbsences = _.filter(state.absences, { employeeId: id })

            const monthAbsences = _.filter(employeeAbsences, function (absent) {
                return isSameMonth(parseISO(absent.dateStarted), new Date())
            })

            let totalAbsences = 0;

            _.map(monthAbsences, function (absent) {
                totalAbsences += differenceInDays(parseISO(absent.dateEnded), parseISO(absent.dateStarted)) + 1;
            })

            if (leaves - companyLeaves > 0) return totalAbsences + (leaves - companyLeaves)

            state.employee.totalAbsences = totalAbsences
        }
    }
})

export const { setAbsences, setTotalAbsences, addAbsent, computeTotalAbsences } = Absences.actions

export default Absences.reducer