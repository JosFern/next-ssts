import { createSlice } from '@reduxjs/toolkit';
import { parseISO, isSameMonth, differenceInHours } from 'date-fns';
import _ from 'lodash'

export const Overtime = createSlice({
    name: 'overtime',
    initialState: {
        employee: {
            totalOvertime: 0,
        },
        overtime: [
            {
                id: 1,
                employeeId: 1,
                dateStarted: '2022-09-01T17:10:34+08:00',
                dateEnded: '2022-09-01T21:10:34+08:00',
                reason: 'vacation'
            },
            {
                id: 1,
                employeeId: 1,
                dateStarted: '2022-09-12T17:10:34+08:00',
                dateEnded: '2022-09-12T20:10:34+08:00',
                reason: 'vacation'
            },
        ]
    },
    reducers: {
        setOvertime: (state, action) => {
            state.overtime = action.payload
        },

        computeTotalOvertime: (state, action) => {
            const { id, companyOvertimeLimit } = action.payload

            const employeeOvertime = _.filter(state.overtime, { employeeId: id })

            const monthOvertime = _.filter(employeeOvertime, function (absent) {
                return isSameMonth(parseISO(absent.dateStarted), new Date())
            })

            let totalOvertime = 0;

            _.forEach(monthOvertime, function (overtime) {
                totalOvertime += differenceInHours(parseISO(overtime.dateEnded), parseISO(overtime.dateStarted))
            })

            // console.log("total overtime: "+Math.min(totalOvertime, companyOvertimeLimit));

            state.employee.totalOvertime = Math.min(totalOvertime, companyOvertimeLimit)

        }
    }
})

export const { setOvertime, computeTotalOvertime } = Overtime.actions

export default Overtime.reducer