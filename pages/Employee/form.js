import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import _ from 'lodash'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../../store/reducers/employee';
import { addAccount, updateAccount } from '../../store/reducers/account';

export default function EmployeeForm() {

    const router = useRouter()

    const comp = useSelector(state => state.company)
    const acc = useSelector(state => state.account)
    const emp = useSelector(state => state.employee)
    const dispatch = useDispatch()

    const isFormAdd = _.isEmpty(router?.query)

    const [error, setError] = useState(false)

    const [origEmail, setOrigEmail] = useState('')

    const [message, setMessage] = useState('')

    const [employeeInfo, setEmployeeInfo] = useState({
        accountID: '',
        firstName: '',
        lastName: '',
        email: '',
        company: 0,
        employeeID: '',
        position: '',
        salaryPerHour: 0,
        employeeType: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (!isFormAdd) {
            const employee = _.find(emp.employees, { accountID: Number(router?.query?.id) })
            const passInfo = _.find(acc.accounts, { accountID: Number(router?.query?.id) })

            setOrigEmail(passInfo.email) //FOR VALIDATION IF EMAIL IS STILL THE SAME


            setEmployeeInfo({
                ...employeeInfo,
                accountID: employee.accountID,
                employeeID: employee.employeeID,
                firstName: employee.firstName,
                lastName: employee.lastName,
                company: employee.associatedCompany,
                employeeType: employee.employeeType,
                salaryPerHour: employee.salaryPerHour,
                position: employee.position,


                email: passInfo.email,
                password: passInfo.password,
                confirmPassword: passInfo.password

            })
        }

        console.log('useeffect checker');
    }, [isFormAdd])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInfo({
            ...employeeInfo,
            [name]: value
        })
    }

    const validation = () => {

        if (employeeInfo.password !== employeeInfo.confirmPassword) return 'Passwords not matched'

        const isExist = _.find(acc.accounts, function (account) {
            return account.email === employeeInfo.email || account.accountID === Number(employeeInfo.accountID)
        })

        if (isFormAdd) {

            if (isExist) return 'Account already exist'

        } else {

            if (origEmail !== employeeInfo.email) {

                const isEmailExist = _.find(acc.accounts, { email: employeeInfo.email })

                if (isEmailExist) return 'Account already exist'
            }
        }



        return 'ok'

    }

    const handleAddEmpSubmit = (e) => {
        e.preventDefault()
        setError(false)
        setMessage('')

        const { accountID, firstName, lastName, email, company, employeeID, position, salaryPerHour, employeeType, password } = employeeInfo

        const message = validation()

        if (isFormAdd) {
            //THIS IS FOR WHEN ADDING NEW EMPLOYEE

            if (message !== 'ok') {
                setError(true)
                setMessage(message)
            } else {

                dispatch(addEmployee({
                    employeeType,
                    accountID: Number(accountID),
                    employeeID: Number(employeeID),
                    firstName,
                    lastName,
                    associatedCompany: Number(comp.company.accountID),
                    salaryPerHour: Number(salaryPerHour),
                    position,
                    dailywage: 0,
                    currMonthSal: 0
                }))

                dispatch(addAccount({
                    accountID: Number(accountID),
                    firstName,
                    email,
                    password,
                    type: 'employee'
                }))

                router.back()
            }

        } else {
            //THIS IS FOR WHEN UPDATING EMPLOYEE

            if (message !== 'ok') {
                setError(true)
                setMessage(message)
            } else {
                dispatch(updateEmployee({
                    employeeType,
                    accountID: Number(accountID),
                    employeeID: Number(employeeID),
                    firstName,
                    lastName,
                    associatedCompany: Number(company),
                    salaryPerHour: Number(salaryPerHour),
                    position,
                    dailywage: 0,
                    currMonthSal: 0
                }))
                dispatch(updateAccount({ id: Number(accountID), firstName, email, password }))
                router.back()
            }
        }

    }

    return (
        <DashboardLayout>
            <Box className='bg-white p-4 flex flex-col justify-center items-center rounded-md shadow-lg text-gray-600'>
                <Typography className="" id="modal-modal-title" variant="h5" component="h2">
                    {isFormAdd ? 'Add Employee' : 'Update Employee'}
                </Typography>
                <Box className='w-full' component="form" onSubmit={handleAddEmpSubmit}>
                    <TextField
                        disabled={!isFormAdd}
                        name='accountID'
                        type="text"
                        label='account ID'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        required
                        fullWidth
                        error={error}
                        onChange={handleChange}
                        value={employeeInfo.accountID}
                        data-testid="accountID-input"
                    />
                    <Box className='flex gap-1'>
                        <TextField
                            name='firstName'
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            required
                            fullWidth
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.firstName}
                            data-testid="firstname-input"
                        />
                        <TextField
                            name='lastName'
                            type="text"
                            label='Last name'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            required
                            fullWidth
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.lastName}
                            data-testid="lastname-input"
                        />
                        <TextField
                            name='email'
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.email}
                            data-testid="email-input"
                        />
                    </Box>

                    <Box className='flex gap-1'>
                        <TextField
                            disabled={!isFormAdd}
                            name='employeeID'
                            type="number"
                            label='Employee ID'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.employeeID}
                            data-testid="employeeID-input"
                        />

                        <FormControl required fullWidth margin='dense'>
                            <InputLabel>Employee Type</InputLabel>
                            <Select
                                name='employeeType'
                                label="Employee Type"
                                value={employeeInfo.employeeType}
                                onChange={handleChange}
                                data-testid="employeeType-input"
                            >
                                <MenuItem value="fulltime">Full Time</MenuItem>
                                <MenuItem value="parttime">Part Time</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

                    <Box className='flex gap-1'>
                        <TextField
                            name='position'
                            type="text"
                            label='Position'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.position}
                            data-testid="position-input"
                        />

                        <TextField
                            name='salaryPerHour'
                            type="number"
                            label='Salary Per Hour'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.salaryPerHour}
                            data-testid="salaryPerHour-input"
                        />


                    </Box>


                    <TextField
                        name='password'
                        type="password"
                        label='Password'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        onChange={handleChange}
                        value={employeeInfo.password}
                        data-testid="password-input"
                    />
                    <TextField
                        name='confirmPassword'
                        type="password"
                        label='Confirm password'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        onChange={handleChange}
                        value={employeeInfo.confirmPassword}
                        data-testid="confirmPassword-input"
                    />

                    {error &&
                        <Typography className='self-center' color='error'>
                            {message}
                        </Typography>
                    }

                    <Button className='bg-[#44bd32] hover:bg-[#4cd137] text-white tracking-wider' type='submit' variant='contained'>Submit</Button>
                </Box>
            </Box>

        </DashboardLayout>
    )
}
