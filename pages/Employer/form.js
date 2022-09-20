import { TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout'

export default function Home() {

    const router = useRouter()

    const handleAddEmpSubmit = (e) => {
        e.preventDefault()
    }

    if (router.query?.id) return (
        <DashboardLayout >
            <Container sx={{width: 400, background: '#fff', padding: '15px 0', borderRadius: 5, boxShadow:  '1px 1px 10px'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                        Update Employer
                        </Typography>
                        <form onSubmit={handleAddEmpSubmit}>
                    <TextField
                        defaultValue='Joselito'
                                type="text"
                                label='First name'
                                variant="outlined"
                                color="secondary"
                                margin='normal'
                                fullWidth
                                required
                            />
                    <TextField
                        defaultValue='Basic'
                                type="text"
                                label='Last name'
                                variant="outlined"
                                color="secondary"
                                margin='normal'
                                fullWidth
                                required
                            />
                    <TextField
                        defaultValue='joselito@gmail.com'
                                type="text"
                                label='Email'
                                variant="outlined"
                                color="secondary"
                                margin='normal'
                                fullWidth
                                required
                            />
                    <TextField
                        defaultValue='Workbean'
                                type="text"
                                label='Company Name'
                                variant="outlined"
                                color="secondary"
                                margin='normal'
                                fullWidth
                                required
                            />

                    <TextField
                        defaultValue='123123123'
                                type="text"
                                label='Password'
                                variant="outlined"
                                color="secondary"
                                margin='normal'
                                fullWidth
                                required
                            />

                            <Button variant='contained'>Update</Button>
                        </form>
            </Container>

        </DashboardLayout>
    )


    return (
        <DashboardLayout
            style={{
                background: '#f0f2f5',
                minHeight: '100vh'
            }}
        >
            <Container sx={{width: 400, background: '#fff', padding: '15px 0', borderRadius: 5, boxShadow:  '1px 1px 10px'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add Employer
                </Typography>
                <form onSubmit={handleAddEmpSubmit}>
                    <TextField
                        type="text"
                        label='First name'
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label='Last name'
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label='Email'
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label='Company name'
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />
                    <TextField
                        type="Password"
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        margin='normal'
                        fullWidth
                        required
                    />

                    <Button variant='contained'>Submit</Button>
                </form>
            </Container>

        </DashboardLayout>
  )
}
