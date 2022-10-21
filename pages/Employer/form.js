import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { addEmployer, updateEmployer } from '../../store/reducers/employer';
import { addAccount, updateAccount } from '../../store/reducers/account';
import axios from 'axios';
import { axiosAuth, encryptParams } from '../../auth/authParams';

export default function EmployerForm() {

    const router = useRouter()

    const [employerInfo, setEmployerInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        companyID: '',
        password: '',
        confirmPassword: ''
    })

    const comp = useSelector(state => state.company)
    // const acc = useSelector(state => state.account)
    const emp = useSelector(state => state.employer)
    const user = useSelector(state => state.logged)

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const isFormAdd = _.isEmpty(router?.query)

    useEffect(() => {
        if (!isFormAdd && router.isReady) {
            setEmployerCallback()
        }

        console.log('employer useeffect checker');
    }, [isFormAdd, router.isReady, setEmployerCallback])

    const setEmployerCallback = useCallback(() => {
        const employer = _.find(emp.employers, { employerID: router?.query?.id })

        setEmployerInfo({
            ...employerInfo,
            firstname: employer.firstname,
            lastname: employer.lastname,
            companyID: employer.companyID,
            email: employer.email,

            password: employer.password,
            confirmPassword: employer.password

        })
    }, [employerInfo, emp.employers, router?.query?.id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmployerInfo({
            ...employerInfo,
            [name]: value
        })
    }

    //----------HANDLES FORM VALIDATION EMPLOYER---------------
    const validation = () => {

        if (employerInfo.password.length < 7) return 'Password must be 8 characters or longer!'

        if (employerInfo.password !== employerInfo.confirmPassword) return 'Passwords not matched'

        return 'ok'
    }

    //----------HANDLES FORM SUBMITION---------------
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setMessage('')

        const message = validation()

        if (message === "ok") {

            if (isFormAdd) {

                //THIS IS FOR WHEN ADDING NEW EMPLOYER

                const encryptData = await encryptParams(employerInfo)

                const addEmployer = await axiosAuth(user.loggedIn.token).post('/employer', JSON.stringify(encryptData))
                    .catch(err => {
                        setError(true)
                        setMessage(err?.response?.data)
                    })

                if (addEmployer?.status === 201) router.back()

            } else {
                //THIS IS FOR WHEN UPDATING EMPLOYER

                const encryptData = await encryptParams(employerInfo)

                const updateEmployer = await axiosAuth(user.loggedIn.token).put(`/employer/${router?.query?.id}`, JSON.stringify(encryptData))
                    .catch(err => {
                        setError(true)
                        setMessage(err?.response?.data)
                    })

                if (updateEmployer?.status === 200) router.back()

            }
        } else {
            setError(true)
            setMessage(message)
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

                    <FormControl required fullWidth margin='dense'>
                        <InputLabel>Company</InputLabel>
                        <Select
                            name='companyID'
                            label="Employee Type"
                            disabled={!isFormAdd}
                            value={employerInfo.companyID}
                            onChange={handleChange}
                            data-testid="company-input"
                        >
                            {_.map(comp.companies, (company) => (
                                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box className='flex gap-1'>
                        <TextField
                            name='firstname'
                            value={employerInfo.firstname}
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
                            name='lastname'
                            value={employerInfo.lastname}
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
                            disabled={!isFormAdd}
                            error={error}
                            data-testid="email-input"
                        />

                    </Box>

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
