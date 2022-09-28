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
                accountID: 5,
                employeeID: 102,
                firstName: 'jose',
                lastName: 'Basic',
                position: 'intern',
                associatedCompany: 1,
                salaryPerHour: 10,
                dailyWage: 0,
                currMonthSal: 0
            },
            {
                employeeType: 'fulltime',
                accountID: 6,
                employeeID: 101,
                firstName: 'Joselito',
                lastName: 'Basic',
                position: 'intern',
                associatedCompany: 1,
                salaryPerHour: 15,
                dailyWage: 0,
                currMonthSal: 0
            },
            {
                employeeType: 'fulltime',
                accountID: 1,
                firstName: 'Employee',
                lastName: 'employee',
                position: 'developer',
                associatedCompany: 1,
                salaryPerHour: 20,
                dailyWage: 0,
                currMonthSal: 0
            },
        ],
        monthlySalary: [],
        employee: {
            employeeType: '',
            accountID: 0,
            firstName: '',
            lastName: '',
            position: '',
            associatedCompany: 0,
            salaryPerHour: 0,
            dailyWage: 0,
            currMonthSal: 0
        }
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload
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

export const { setEmployees, addEmployee, deleteEmployee, updateEmployee, setMonthlySalares, computeDailyWage, computeWeekSalary, computeMonthlySalary } = EmployeeStore.actions

export default EmployeeStore.reducer