import { Box, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import { useEffect, useState } from 'react';
import { find, isEmpty, lowerCase, replace } from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentCompany } from '../../store/reducers/company';

export default function CompanyForm() {

    const router = useRouter()

    const com = useSelector(state => state.company)

    const [company, setCompany] = useState({
        name: '',
        allotedleaves: '',
        overtimelimit: '',
    })

    const [error, setError] = useState(false)

    const [message, setMessage] = useState("")

    const isFormAdd = isEmpty(router?.query)

    const [origName, setOrigName] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isFormAdd) {
            const comp = find(com.companies, { id: router?.query?.id })

            setCompany({
                ...company,
                name: comp.name,
                allotedleaves: comp.allocateLeaves,
                overtimelimit: comp.allocateOvertime
            })
        }
    }, [])

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

            const addCompany = await axios.post('http://localhost:8080/company', JSON.stringify(company))
                .catch(err => {
                    setError(true)
                    setMessage(err.response.data)
                })

            if (addCompany?.status === 201) router.back()

        } else {

            const updateCompany = await axios.put(`http://localhost:8080/company/${router?.query?.id}`, JSON.stringify(company))
                .catch(err => {
                    setError(true)
                    setMessage(err.response.data)
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
