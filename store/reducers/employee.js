import { createSlice } from '@reduxjs/toolkit';
import { differenceInDays, formatISO, getMonth, isSameMonth, parseISO } from 'date-fns'
import _ from 'lodash';

export const EmployeeStore = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        monthlySalary: [],
        employee: {
            employeeID: '',
            empType: '',
            firstname: '',
            lastname: '',
            email: '',
            pos: '',
            rate: 0,
            dailyWage: 0,
            currMonthSal: 0
        }
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload
        },

        setDailyWage: (state, action) => {
            const { dailywage } = action.payload

            state.employee.dailyWage = dailywage
        },

        setCurrentEmployee: (state, action) => {
            const { employeeID, firstname, lastname, email, rate, empType, pos } = action.payload
            state.employee = { ...state.employee, firstname, lastname, email, rate, empType, pos, employeeID }
        },

        setCurrentMonthlySalary: (state, action) => {
            const { monthlySalary } = action.payload

            state.employee.currMonthSal = monthlySalary
        },

        //-----------------------------------------------------------------------------
        computeWeekSalary: (state, action) => {
            const { id, overtimeLimit, workDays, workingHours } = action.payload

            const totalAbsences = state.employees[id].absences - state.employees[id].leaves

            const paidDays = workDays - totalAbsences

            const totalHours = paidDays * workingHours

            state.overtime[id].overtimeID = totalHours + Math.min(state.employees[id].overtime, overtimeLimit)
        },

        addEmployee: (state, action) => {
            state.employees = [...state.employees, action.payload]
        },

        deleteEmployee: (state, action) => {
            const index = _.findIndex(state.employees, { accountID: action.payload })

            state.employees.splice(index, 1)
        },

        updateEmployee: (state, action) => {
            const { employeeType, accountID, employeeID, firstName, lastName, associatedCompany, salaryPerHour, position, dailywage, currMonthSal } = action.payload

            const index = _.findIndex(state.employees, { accountID: accountID })

            state.employees[index] = { ...state.employees[index], employeeType, employeeID, firstName, lastName, associatedCompany, salaryPerHour, position, dailywage, currMonthSal }
        },

        deleteEmployees: (state, action) => {
            const updateEmp = _.filter(state.employees, emp => action.payload.includes(emp.accountID) ? false : true)

            state.employees = [...updateEmp]

        },

        setMonthlySalares: (state, action) => {
            state.monthlySalary = action.payload
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

            state.employee = { ...state.employee, currMonthSal: monthSalary }
        }
    }
})

export const { setEmployees, addEmployee, setCurrentMonthlySalary, deleteEmployee, updateEmployee, deleteEmployees, setCurrentEmployee, setMonthlySalares, setDailyWage, computeWeekSalary, computeMonthlySalary } = EmployeeStore.actions

export default EmployeeStore.reducer