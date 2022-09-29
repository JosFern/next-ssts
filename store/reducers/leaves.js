import { createSlice } from '@reduxjs/toolkit';
import { addDays, parseISO, formatISO, isSameMonth, differenceInDays } from 'date-fns';
import _ from 'lodash'

export const Leaves = createSlice({
    name: 'leaves',
    initialState: {
        employee: {
            remainingLeaves: 0,
        },
        leaves: [],
        requestLeaves: [],
    },
    reducers: {
        setLeaves: (state, action) => {
            state.leaves = action.payload
        },

        addLeaveRequest: (state, action) => {
            state.requestLeaves = [...state.requestLeaves, action.payload]
        },

        approveRequest: (state, action) => {

            let idGenerate = Math.floor((Math.random() * 100) + 1);

            console.log({ ...state.requestLeaves[action.payload], id: idGenerate });

            state.leaves.push({ ...state.requestLeaves[action.payload], id: idGenerate })

            state.requestLeaves.splice(action.payload, 1)
        },

        disapproveRequest: (state, action) => {
            state.requestLeaves.splice(action.payload, 1)
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

export const { setLeaves, addLeaveRequest, approveRequest, disapproveRequest, computeRemainingLeaves } = Leaves.actions

export default Leaves.reducer