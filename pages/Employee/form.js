import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../../store/reducers/employee';
import { addAccount, updateAccount } from '../../store/reducers/account';
import { axiosAuth, encryptParams, verifyParams } from '../../auth/authParams';

export default function EmployeeForm() {

    const router = useRouter()

    const user = useSelector(state => state.logged)
    const comp = useSelector(state => state.company)
    const emp = useSelector(state => state.employee)
    const dispatch = useDispatch()

    const isFormAdd = _.isEmpty(router?.query)

    const [error, setError] = useState(false)

    const [message, setMessage] = useState('')

    const [employeeInfo, setEmployeeInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        companyID: comp.company.id,
        pos: '',
        rate: 0,
        empType: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (!isFormAdd && router.isReady) {
            setEmployeeCallback()
        }

        console.log('employee form useeffect checker');
    }, [isFormAdd, router.isReady, setEmployeeCallback])

    //----------HANDLES SETTING EMPLOYEE INFO TO FIELDS IF UPDATING-------------
    const setEmployeeCallback = useCallback(() => {
        const employee = _.find(emp.employees, { employeeID: router?.query?.id })

        setEmployeeInfo({
            ...employeeInfo,
            firstname: employee.firstname,
            lastname: employee.lastname,
            companyID: employee.companyID,
            empType: employee.empType,
            rate: employee.rate,
            pos: employee.pos,
            email: employee.email,
            password: employee.password,
            confirmPassword: employee.password

        })

    }, [emp.employees, employeeInfo, router?.query?.id])

    //---------HANDLES TEXTFIELD CHANGES-------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInfo({
            ...employeeInfo,
            [name]: value
        })
    }

    //----------HANDLES FORM VALIDATION---------------
    const validation = () => {

        if (employeeInfo.password.length < 7) return 'Password must be 8 characters or longer!'

        if (employeeInfo.password !== employeeInfo.confirmPassword) return 'Passwords not matched'

        return 'ok'
    }

    //----------HANDLES FORM SUBMITION---------------
    const handleAddEmpSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setMessage('')

        const message = validation()

        if (message === 'ok') {

            if (isFormAdd) {

                //THIS IS FOR WHEN ADDING NEW EMPLOYEE

                const { rate } = employeeInfo

                const encryptData = await encryptParams({ ...employeeInfo, rate: Number(rate) })

                const addEmployee = await axiosAuth(user.loggedIn.token).post('/employee', JSON.stringify(encryptData))
                    .catch(err => {
                        setError(true)
                        setMessage(err?.response?.data)
                    })

                if (addEmployee?.status === 201) router.back()

            } else {

                //THIS IS FOR WHEN UPDATING EMPLOYEE

                const { rate } = employeeInfo

                const encryptData = await encryptParams({ ...employeeInfo, rate: Number(rate) })

                const updateEmployee = await axiosAuth(user.loggedIn.token).put(`/employee/${router?.query?.id}`, JSON.stringify(encryptData))
                    .catch(err => {
                        setError(true)
                        setMessage(err?.response?.data)
                    })

                if (updateEmployee?.status === 200) router.back()
            }

        } else {
            setError(true)
            setMessage(message)
        }

    }

    return (
        <DashboardLayout>
            <Box className='flex justify-center'>
                <Box className='bg-white p-4 flex flex-col justify-center items-center rounded-md shadow-lg text-gray-600 w-[400px]'>
                    <Typography className="" id="modal-modal-title" variant="h5" component="h2">
                        {isFormAdd ? 'Add Employee' : 'Update Employee'}
                    </Typography>
                    <Box className='w-full' component="form" onSubmit={handleAddEmpSubmit}>
                        <Box className='flex gap-1'>
                            <TextField
                                name='firstname'
                                type="text"
                                label='First name'
                                variant="outlined"
                                color="secondary"
                                margin='dense'
                                required
                                fullWidth
                                error={error}
                                onChange={handleChange}
                                value={employeeInfo.firstname}
                                data-testid="firstname-input"
                            />
                            <TextField
                                name='lastname'
                                type="text"
                                label='Last name'
                                variant="outlined"
                                color="secondary"
                                margin='dense'
                                required
                                fullWidth
                                error={error}
                                onChange={handleChange}
                                value={employeeInfo.lastname}
                                data-testid="lastname-input"
                            />
                        </Box>

                        <TextField
                            name='email'
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            disabled={!isFormAdd}
                            error={error}
                            onChange={handleChange}
                            value={employeeInfo.email}
                            data-testid="email-input"
                        />

                        <FormControl required fullWidth margin='dense'>
                            <InputLabel>Employee Type</InputLabel>
                            <Select
                                name='empType'
                                label="Employee Type"
                                value={employeeInfo.empType}
                                onChange={handleChange}
                                data-testid="employeeType-input"
                            >
                                <MenuItem value="fulltime">Full Time</MenuItem>
                                <MenuItem value="parttime">Part Time</MenuItem>
                            </Select>
                        </FormControl>

                        <Box className='flex gap-1'>

                            <TextField
                                name='pos'
                                type="text"
                                label='Position'
                                variant="outlined"
                                color="secondary"
                                margin='dense'
                                fullWidth
                                required
                                error={error}
                                onChange={handleChange}
                                value={employeeInfo.pos}
                                data-testid="position-input"
                            />

                            <TextField
                                name='rate'
                                type="number"
                                label='Salary Per Hour'
                                variant="outlined"
                                color="secondary"
                                margin='dense'
                                fullWidth
                                required
                                error={error}
                                onChange={handleChange}
                                value={employeeInfo.rate}
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

            </Box>

        </DashboardLayout>
    )
}
