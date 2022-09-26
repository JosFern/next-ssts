import { Avatar, Modal, TextField, Container } from '@mui/material'
import styles from '../styles/Home.module.css'
import { green } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import DashboardLayout from './components/DashboardLayout'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};


export default function Profile() {

    const [updateProfile, setUpdateProfile] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    const router = useRouter()

    const handleUpdateProfSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <DashboardLayout>
            <Container className='flex flex-col p-4 justify-center items-center'>
                <Box className='w-[300px] p-4 flex flex-col justify-center items-center rounded-md shadow-md gap-2 bg-white'>
                    <Avatar sx={{ bgcolor: green[400], width: 70, height: 70 }}>P</Avatar>

                    <Typography mt={2} color='gray' variant='h5' >ProfileName</Typography>

                    <Typography color='gray' >email@gmail.com</Typography>
                    <Typography mt={2} color='gray' >role: employer</Typography>

                    <Box className='flex flex-col gap-3'>
                        <Button className='bg-[#33b33d]' color='success' data-testid="update-profile-btn" onClick={() => setUpdateProfile(true)} variant='contained'>Update Profile</Button>
                        <Button className='bg-[#0e79e1]' color='info' data-testid="update-password-btn" onClick={() => setUpdatePassword(true)} variant='contained'>Update Password</Button>
                        <Button className='bg-[#dc3c18]' color='error' data-testid="logout-btn" onClick={() => router.push('/')} variant='contained'>logout</Button>
                    </Box>
                </Box>

                {/* MODAL FOR UPDATING PROFILE */}
                <Modal
                    open={updateProfile}
                    onClose={() => setUpdateProfile(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form" onSubmit={handleUpdateProfSubmit}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Update Profile
                        </Typography>
                        <TextField
                            defaultValue='Profile'
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="update-firstname-input"
                        />
                        <TextField
                            defaultValue='Name'
                            type="text"
                            label='Last name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="update-lastname-input"
                        />
                        <TextField
                            defaultValue='email@gmail.com'
                            type="text"
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="update-email-input"
                        />

                        <Button className='bg-[#33b33d]' color='success' variant='contained'>Update Profile</Button>
                    </Box>
                </Modal>

                {/* MODAL FOR UPDATING PASSWORD */}
                <Modal
                    open={updatePassword}
                    onClose={() => setUpdatePassword(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form" onSubmit={handleUpdateProfSubmit} >
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Update password
                        </Typography>
                        <TextField
                            type="text"
                            label='Current Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="current-password-input"
                        />
                        <TextField
                            type="text"
                            label='New Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="new-password-input"
                        />
                        <TextField
                            type="text"
                            label='Confirm Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            data-testid="confirm-password-input"
                        />

                        <Button className='bg-[#33b33d]' color='success' variant='contained'>Update Password</Button>
                    </Box>
                </Modal>
            </Container>

        </DashboardLayout>
    )
}
