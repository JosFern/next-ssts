import { Box, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import { useCallback, useEffect, useState } from 'react';
import { find, isEmpty } from 'lodash'
import { useSelector } from 'react-redux';
import { axiosAuth, encryptParams } from '../../auth/authParams';

export default function CompanyForm() {

    const router = useRouter()

    const com = useSelector(state => state.company)
    const user = useSelector(state => state.logged)

    const [company, setCompany] = useState({
        name: '',
        allotedleaves: '',
        overtimelimit: '',
    })

    const [error, setError] = useState(false)

    const [message, setMessage] = useState("")

    const isFormAdd = isEmpty(router?.query)

    useEffect(() => {
        if (!isFormAdd && router.isReady) {
            setCompanyCallback()
        }
        console.log('company useeffect checker');
    }, [isFormAdd, router.isReady, setCompanyCallback])

    const setCompanyCallback = useCallback(() => {
        const comp = find(com.companies, { id: router?.query?.id })

        setCompany({
            ...company,
            name: comp.name,
            allotedleaves: comp.allocateLeaves,
            overtimelimit: comp.allocateOvertime
        })
    }, [com.companies, company, router?.query?.id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setCompany({
            ...company,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setMessage("")

        if (isFormAdd) {

            //THIS IS FOR WHEN ADDING NEW COMPANY

            const encryptData = await encryptParams(company)

            const addCompany = await axiosAuth(user.loggedIn.token).post('/company', JSON.stringify(encryptData))
                .catch(err => {
                    setError(true)
                    setMessage(err?.response?.data)
                })

            if (addCompany?.status === 201) router.back()

        } else {

            //THIS IS FOR WHEN UPDATING COMPANY

            const encryptData = await encryptParams(company)

            const updateCompany = await axiosAuth(user.loggedIn.token).put(`/company/${router?.query?.id}`, JSON.stringify(encryptData))
                .catch(err => {
                    setError(true)
                    setMessage(err?.response?.data)
                })

            if (updateCompany?.status === 200) router.back()

        }

    }


    return (
        <DashboardLayout>
            <Container sx={{ width: 400, background: '#fff', padding: '15px 0', borderRadius: 5, boxShadow: '1px 1px 10px' }}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    {isFormAdd ? 'Add Company' : 'Update Company'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        name='name'
                        value={company.name}
                        onChange={handleChange}
                        type="text"
                        label='Company name'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        disabled={!isFormAdd}
                        error={error}
                        data-testid="company-input"
                    />

                    <Box className='flex gap-1'>

                        <TextField
                            name='allotedleaves'
                            value={company.allotedleaves}
                            onChange={handleChange}
                            type="number"
                            label='Leaves'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            data-testid="leaves-input"
                        />

                        <TextField
                            name='overtimelimit'
                            value={company.overtimelimit}
                            onChange={handleChange}
                            type="number"
                            label='Overtime Limit'
                            variant="outlined"
                            color="secondary"
                            margin='dense'
                            fullWidth
                            required
                            error={error}
                            data-testid="overtime-input"
                        />
                    </Box>

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
