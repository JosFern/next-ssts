import { Box, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'
import { useEffect, useState } from 'react';
import _, { lowerCase, replace } from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../../store/reducers/company';

export default function CompanyForm() {

    const router = useRouter()

    const com = useSelector(state => state.company)

    const [company, setCompany] = useState({
        id: '',
        name: '',
        accountID: '',
        leaves: '',
        overtimeLimit: '',
    })

    const [error, setError] = useState(false)

    const isFormAdd = _.isEmpty(router?.query)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setCompany({
            ...company,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)

        const companies = _.map(com.companies, (company) => ({ ...company, name: lowerCase(company.name) }))

        const isExist = _.find(companies, function (comp) {
            return comp.name === lowerCase(company.name) || comp.accountID === Number(company.accountID)
        })

        if (isExist) {
            setError(true)
        } else {
            dispatch(addCompany(company))
            router.back()
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
                        name='id'
                        value={company.id}
                        onChange={handleChange}
                        type="number"
                        label='id'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        data-testid="id-input"
                    />
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
                        error={error}
                        data-testid="company-input"
                    />

                    <TextField
                        name='accountID'
                        value={company.accountID}
                        onChange={handleChange}
                        type="text"
                        label='Account ID'
                        variant="outlined"
                        color="secondary"
                        margin='dense'
                        fullWidth
                        required
                        error={error}
                        data-testid="accountID-input"
                    />

                    <Box className='flex gap-1'>

                        <TextField
                            name='leaves'
                            value={company.leaves}
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
                            name='overtimeLimit'
                            value={company.overtimeLimit}
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
                            Company account already exist
                        </Typography>
                    }

                    <Button type='submit' className='bg-[#33b33d]' color='success' data-testid="submit-btns" variant='contained'>Submit</Button>
                </Box>
            </Container>

        </DashboardLayout>
    )
}
