import { createSlice } from '@reduxjs/toolkit';
import { parseISO, isSameMonth, differenceInHours } from 'date-fns';
import _ from 'lodash'

export const Overtime = createSlice({
    name: 'overtime',
    initialState: {
        employee: {
            totalOvertime: 0,
        },
        overtime: [],
        requestOvertime: []
    },
    reducers: {
        setOvertime: (state, action) => {
            state.overtime = action.payload
        },

        setTotalOvertime: (state, action) => {
            const { totalOvertime } = action.payload

            state.employee.totalOvertime = totalOvertime
        },

        //----------------------------------------------------------
        addOTRequest: (state, action) => {
            state.requestOvertime = [...state.requestOvertime, action.payload]
        },

        approveOTRequest: (state, action) => {

            let idGenerate = Math.floor((Math.random() * 100) + 1);

            console.log({ ...state.requestOvertime[action.payload], id: idGenerate });

            state.overtime.push({ ...state.requestOvertime[action.payload], id: idGenerate })

            state.requestOvertime.splice(action.payload, 1)
        },

        disapproveOTRequest: (state, action) => {
            state.requestOvertime.splice(action.payload, 1)
        },


        computeTotalOvertime: (state, action) => {
            const { id, companyOvertimeLimit } = action.payload

            const employeeOvertime = _.filter(state.overtime, { employeeId: id })

            const monthOvertime = _.filter(employeeOvertime, function (absent) {
                return isSameMonth(parseISO(absent.dateStarted), new Date())
            })

            let totalOvertime = 0;

            _.map(monthOvertime, function (overtime) {
                totalOvertime += differenceInHours(parseISO(overtime.dateEnded), parseISO(overtime.dateStarted))
            })

            // console.log("total overtime: "+Math.min(totalOvertime, companyOvertimeLimit));

            state.employee.totalOvertime = Math.min(totalOvertime, companyOvertimeLimit)

        }
    }
})

export const { setOvertime, setTotalOvertime, addOTRequest, approveOTRequest, disapproveOTRequest, computeTotalOvertime } = Overtime.actions

export default Overtime.reducer