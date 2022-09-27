import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import _ from 'lodash'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../store/reducers/employee';
import { addAccount } from '../../store/reducers/account';

export default function EmployeeForm() {

    const router = useRouter()

    const comp = useSelector(state => state.company)
    const acc = useSelector(state => state.account)
    const dispatch = useDispatch()

    const isFormAdd = _.isEmpty(router?.query)

    const [error, setError] = useState(false)

    const [employeeInfo, setEmployeeInfo] = useState({
        accountID: '',
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        employeeID: '',
        position: '',
        salaryPerHour: 0,
        employeeType: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (!isFormAdd) {
            setEmployeeInfo({
                ...employeeInfo,
                firstName: 'joselito',
                lastName: 'baisac',
                salaryPerHour: 123,
                employeeType: 'parttime'
            })
        }
    }, [isFormAdd, employeeInfo])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInfo({
            ...employeeInfo,
            [name]: value
        })
    }

    const handleAddEmpSubmit = (e) => {
        e.preventDefault()
        setError(false)

        const { accountID, firstName, lastName, email, company, employeeID, position, salaryPerHour, employeeType, password } = employeeInfo

        const isExist = _.find(acc.accounts, function (account) {
            return account.email === employeeInfo.email || account.accountID === Number(employeeInfo.accountID)
        })

        if (isExist) {
            setError(true)
        } else {
            dispatch(addEmployee({ employeeType, accountID, employeeID, firstName, lastName, associatedCompany: company, salaryPerHour, dailywage: 0, currMonthSal: 0 }))
            dispatch(addAccount({ accountID, firstName, email, password, type: 'employee' }))
            router.back()
        }
    }

    return (
        <DashboardLayout>
            <Box className='bg-white p-4 flex flex-col justify-center items-center rounded-md shadow-lg text-gray-600'>
                <Typography className="" id="modal-modal-title" variant="h5" component="h2">
                    {isFormAdd ? 'Add Employee' : 'Update Employee'}
                </Typography>
                <Box className='w-full' component="form" onSubmit={handleAddEmpSubmit}>
                    <Box className='flex gap-1'>
                        <TextField
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
                        <FormControl required fullWidth margin='dense'>
                            <InputLabel>Company</InputLabel>
                            <Select
                                name='company'
                                label="Company"
                                value={employeeInfo.company}
                                onChange={handleChange}
                                data-testid="company-input"
                            >
                                {_.map(comp.companies, (company) => (
                                    <MenuItem key={company.id} value={company.accountID}>{company.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name='employeeID'
                            type="text"
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

                    <Button className='bg-[#44bd32] hover:bg-[#4cd137] text-white tracking-wider' type='submit' variant='contained'>Submit</Button>
                </Box>
            </Box>

        </DashboardLayout>
    )
}
