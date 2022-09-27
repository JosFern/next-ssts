import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { addEmployer, updateEmployer } from '../../store/reducers/employer';
import { addAccount, updateAccount } from '../../store/reducers/account';

export default function EmployerForm() {

    const router = useRouter()

    const [employerInfo, setEmployerInfo] = useState({
        accountID: '',
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: ''
    })

    const [origEmail, setOrigEmail] = useState('')

    const comp = useSelector(state => state.company)
    const acc = useSelector(state => state.account)
    const emp = useSelector(state => state.employer)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const isFormAdd = _.isEmpty(router?.query)

    useEffect(() => {

        if (!isFormAdd) {
            const employer = _.find(emp.employers, { accountID: Number(router?.query?.id) })
            const passInfo = _.find(acc.accounts, { accountID: Number(router?.query?.id) })

            setOrigEmail(employer.email) //FOR VALIDATION IF EMAIL IS STILL THE SAME

            setEmployerInfo({
                ...employerInfo,
                accountID: employer.accountID,
                firstName: employer.firstName,
                lastName: employer.lastName,
                company: employer.company,
                email: employer.email,

                password: passInfo.password,
                confirmPassword: passInfo.password

            })
        }

        console.log('useeffect checker');
    }, [isFormAdd])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmployerInfo({
            ...employerInfo,
            [name]: value
        })
    }

    //----------HANDLES FORM VALIDATION EMPLOYER---------------
    const validation = () => {

        if (employerInfo.password !== employerInfo.confirmPassword) return 'Passwords not matched'

        const isExist = _.find(emp.employers, function (employer) {
            return employer.email === employerInfo.email || employer.accountID === Number(employerInfo.accountID)
        })

        if (isFormAdd) {

            if (isExist) return 'Account already exist'

        } else {

            if (origEmail !== employerInfo.email) {

                const isEmailExist = _.find(emp.employers, { email: employerInfo.email })

                if (isEmailExist) return 'Account already exist'
            }
        }


        return 'ok'
    }

    //----------HANDLES FORM SUBMITION---------------
    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        setMessage('')

        const { accountID, firstName, lastName, email, company, password } = employerInfo;

        const message = validation()


        if (isFormAdd) {
            //THIS IS FOR WHEN ADDING NEW EMPLOYER


            if (message !== 'ok') {
                setError(true)
                setMessage(message)
            } else {
                dispatch(addEmployer({ accountID: Number(accountID), firstName, lastName, email, company }))
                dispatch(addAccount({ accountID: Number(accountID), firstName, email, password, type: 'employer' }))
                router.back()
            }

        } else {
            //THIS IS FOR WHEN UPDATING EMPLOYER

            if (message !== 'ok') {
                setError(true)
                setMessage(message)
            } else {
                dispatch(updateEmployer({ id: Number(accountID), firstName, lastName, email, company }))
                dispatch(updateAccount({ id: Number(accountID), firstName, email, password }))
                router.back()
            }

        }

    }


    return (
        <DashboardLayout
            style={{
                background: '#f0f2f5',
                minHeight: '100vh'
            }}
        >
            <Container sx={{ width: 700, background: '#fff', padding: '15px 0', borderRadius: 5, boxShadow: '1px 1px 10px' }}>
                <Typography className='text-center' id="modal-modal-title" variant="h5" component="h2">
                    {isFormAdd ? 'Add Employer' : 'Update Employer'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        name='accountID'
                        value={employerInfo.accountID}
                        onChange={handleChange}
                        type="number"
                        label='Account ID'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        disabled={!isFormAdd}
                        data-testid="email-input"
                    />
                    <Box className='flex gap-1'>
                        <TextField
                            name='firstName'
                            value={employerInfo.firstName}
                            onChange={handleChange}
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            data-testid="firstname-input"
                        />
                        <TextField
                            name='lastName'
                            value={employerInfo.lastName}
                            onChange={handleChange}
                            type="text"
                            label='Last name'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            data-testid="lastname-input"
                        />

                        <TextField
                            name='email'
                            value={employerInfo.email}
                            onChange={handleChange}
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            data-testid="email-input"
                        />

                    </Box>
                    <FormControl required fullWidth margin='dense'>
                        <InputLabel>Company</InputLabel>
                        <Select
                            name='company'
                            label="Employee Type"
                            value={employerInfo.company}
                            onChange={handleChange}
                            data-testid="company-input"
                        >
                            {_.map(comp.companies, (company) => (
                                <MenuItem key={company.id} value={company.accountID}>{company.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <TextField
                        name='password'
                        value={employerInfo.password}
                        onChange={handleChange}
                        type="Password"
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        data-testid="password-input"
                    />

                    <TextField
                        name='confirmPassword'
                        value={employerInfo.confirmPassword}
                        onChange={handleChange}
                        type="Password"
                        label="Confirm Password"
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        data-testid="confirm-password-input"
                    />

                    {error &&
                        <Typography className='self-center' color='error'>
                            {message}
                        </Typography>
                    }
                    <Button type='submit' className='bg-[#33b33d]' color='success' data-testid="submit-btns" variant='contained'>Submit</Button>
                </Box>
            </Container>



        </DashboardLayout>
    )
}
