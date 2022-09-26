import { createSlice } from '@reduxjs/toolkit';
import { addDays, parseISO, formatISO, isSameMonth, differenceInDays } from 'date-fns';
import _ from 'lodash'

export const Leaves = createSlice({
    name: 'leaves',
    initialState: {
        employee: {
            remainingLeaves: 0,
        },
        leaves: []
    },
    reducers: {
        setLeaves: (state, action) => {
            state.leaves = action.payload
        },

        computeRemainingLeaves: (state, action) => {
            const { companyLeaves, id } = action.payload

            const employeeleaves = _.filter(state.leaves, { employeeId: id })

            const monthLeaves = _.filter(employeeleaves, function (leave) {
                return isSameMonth(parseISO(leave.dateStarted), new Date())
            })

            let totalLeaves = 0;

            _.map(monthLeaves, function (leave) {
                totalLeaves += differenceInDays(parseISO(leave.dateEnded), parseISO(leave.dateStarted)) + 1;
            })

            state.employee.remainingLeaves = Math.max(companyLeaves - totalLeaves, 0)
        }
    }
})

export const { setLeaves, computeRemainingLeaves } = Leaves.actions

export default Leaves.reducer