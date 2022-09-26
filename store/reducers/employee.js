import { createSlice } from '@reduxjs/toolkit';
import { differenceInDays, formatISO, getMonth, isSameMonth, parseISO } from 'date-fns'
import _ from 'lodash';

export const EmployeeStore = createSlice({
    name: 'employee',
    initialState: {
        employees: [
            //sample employee data
            {
                employeeType: 'fulltime',
                accountID: 2,
                employeeIDNum: 102,
                firstName: 'jose',
                lastName: 'Basic',
                associatedCompany: 1,
                salaryPerHour: 15,
                dailyWage: 0,
                currMonthSal: 0
            },
            {
                employeeType: 'fulltime',
                accountID: 1,
                employeeIDNum: 101,
                firstName: 'Joselito',
                lastName: 'Basic',
                associatedCompany: 1,
                salaryPerHour: 15,
                dailyWage: 0,
                currMonthSal: 0
            }
        ],
        monthlySalary: []
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload
        },

        setMonthlySalares: (state, action) => {
            state.monthlySalary = action.payload
        },

        computeWeekSalary: (state, action) => {
            const { id, overtimeLimit, workDays, workingHours } = action.payload

            const totalAbsences = state.employees[id].absences - state.employees[id].leaves

            const paidDays = workDays - totalAbsences

            const totalHours = paidDays * workingHours

            state.overtime[id].overtimeID = totalHours + Math.min(state.employees[id].overtime, overtimeLimit)
        },

        computeDailyWage: (state, action) => {
            const { id } = action.payload

            const index = _.findIndex(state.employees, { accountID: id })

            const { salaryPerHour } = state.employees[index]

            let dailyWorkHours = 4; //working hours in a day

            if (state.employees[index].employeeType === 'fulltime') dailyWorkHours = 8;

            state.employees[index].dailyWage = salaryPerHour * dailyWorkHours

            // console.log('daily wage: ' + (salaryPerHour * dailyWorkHours));
        },

        computeMonthlySalary: (state, action) => {
            const { id, overtime, leavesRemaining, totalAbsences } = action.payload

            const index = _.findIndex(state.employees, { accountID: id })

            const { dailyWage, salaryPerHour } = state.employees[index]

            const monthlyWage = dailyWage * 20;

            const bonusLeaveWages = leavesRemaining * dailyWage;

            const deductFromAbsences = totalAbsences * dailyWage

            const monthSalary = (monthlyWage + (overtime * (salaryPerHour * .2)) + bonusLeaveWages) - deductFromAbsences

            let isMonthSalaryExist = false

            const currMonthIndex = _.findIndex(state.monthlySalary, function (monthSal) {
                return monthSal.empId === id && isSameMonth(parseISO(monthSal.dateMonth), new Date())
            })

            if (currMonthIndex === -1) {
                isMonthSalaryExist = true;
            } else {
                state.monthlySalary[currMonthIndex] = { ...state.monthlySalary[currMonthIndex], salary: monthSalary }
            }

            if (!isMonthSalaryExist) state.monthlySalary.push({ empId: id, dateMonth: formatISO(new Date), salary: monthSalary })

            state.employees[_.findIndex(state.employees, { accountID: id })].currMonthSal = monthSalary;
        }
    }
})

export const { setEmployees, setMonthlySalares, computeDailyWage, computeWeekSalary, computeMonthlySalary } = EmployeeStore.actions

export default EmployeeStore.reducer