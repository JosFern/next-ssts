import { Avatar, Modal, TextField } from '@mui/material'
import styles from '../styles/Home.module.css'
import { green } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

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


export default function Home() {

    const [updateProfile, setUpdateProfile] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    const router = useRouter()

    const handleUpdateProfSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={styles.container}>
            <div className={styles.profilecard}>
                <Avatar sx={{ bgcolor: green[400], width: 70, height: 70 }}>P</Avatar>
                
                <Typography mt={2} color='gray' variant='h5' >ProfileName</Typography>
                
                <Typography color='gray' >email@gmail.com</Typography>
                <Typography mt={2} color='gray' >role: employer</Typography>

                <div className={styles.colunmDir}>
                    <Button onClick={() => setUpdateProfile(true)} variant='contained'>Update Profile</Button>
                    <Button onClick={() => setUpdatePassword(true)} variant='contained'>Update Password</Button>
                    <Button onClick={() => router.push('/')} variant='contained' color='error'>logout</Button>
                </div>
            </div>

            {/* MODAL FOR UPDATING PROFILE */}
            <Modal
                open={updateProfile}
                onClose={() => setUpdateProfile(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                    Update Profile
                    </Typography>
                    <form onSubmit={handleUpdateProfSubmit}>
                        <TextField
                            defaultValue='Profile'
                            type="text"
                            label='First name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
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
                        />

                        <Button variant='contained'>Update Profile</Button>
                    </form>
                </Box>
            </Modal>

            {/* MODAL FOR UPDATING PASSWORD */}
            <Modal
                open={updatePassword}
                onClose={() => setUpdatePassword(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                    Update password
                    </Typography>
                    <form onSubmit={handleUpdateProfSubmit}>
                        <TextField
                            type="text"
                            label='Current Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            label='New Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            label='Confirm Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                        />

                        <Button variant='contained'>Update Password</Button>
                    </form>
                </Box>
            </Modal>
        </div>
  )
}
