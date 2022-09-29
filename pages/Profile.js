import { Avatar, Modal, TextField, Container } from '@mui/material'
import styles from '../styles/Home.module.css'
import { green } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import DashboardLayout from './components/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import _, { upperCase } from 'lodash';
import { updateAccount } from '../store/reducers/account';
import { setLogged } from '../store/reducers/logged';

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

    const log = useSelector(state => state.logged)
    const acc = useSelector(state => state.account)
    const dispatch = useDispatch()

    const [updateProfile, setUpdateProfile] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [error, setError] = useState(false)

    const router = useRouter()


    useEffect(() => {
        console.log('useeffect checker');
    }, [])

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    const openUpdateProfile = () => {
        setUpdateProfile(true)
        setError(false)

        const userPass = _.find(acc.accounts, function (account) {
            return account.email === log.loggedIn.email
        })

        setUserInfo({ ...userInfo, name: log.loggedIn.firstName, email: log.loggedIn.email, password: userPass.password })
    }

    const openUpdatePassword = () => {
        setUpdatePassword(true)
        setError(false)
        setPassword({
            ...updatePassword,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handleUpdateProfSubmit = (e) => {
        e.preventDefault()
        setError(false)

        const { name, email, password } = userInfo

        const isExist = _.find(acc.accounts, function (account) {
            return account.email === email
        })

        console.log(isExist);

        if (isExist) {
            setError(true)
        } else {
            dispatch(updateAccount({ id: log.loggedIn.id, firstName: name, email, password }))
            dispatch(setLogged({ id: log.loggedIn.id, firstName: name, email, role: log.loggedIn.role }))
            router.back()
        }

    }

    const handleUpdatePasswordSubmit = (e) => {
        e.preventDefault()
        setError(false)
    }

    return (
        <DashboardLayout>
            <Container className='flex flex-col p-4 justify-center items-center'>
                <Box className='w-[300px] p-4 flex flex-col justify-center items-center rounded-md shadow-md gap-2 bg-white'>
                    <Avatar sx={{ bgcolor: green[800], width: 70, height: 70 }}>{upperCase(log.loggedIn.firstName[0])}</Avatar>

                    <Typography mt={2} color='gray' variant='h5' >{log.loggedIn.firstName}</Typography>

                    <Typography color='gray' >{log.loggedIn.email}</Typography>
                    <Typography mt={2} color='gray' >role: {log.loggedIn.role}</Typography>

                    <Box className='flex flex-col gap-3'>
                        <Button className='bg-[#33b33d]' color='success' data-testid="update-profile-btn" onClick={openUpdateProfile} variant='contained'>Update Profile</Button>
                        {/* <Button className='bg-[#0e79e1]' color='info' data-testid="update-password-btn" onClick={openUpdatePassword} variant='contained'>Update Password</Button> */}
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
                        <Typography id="modal-modal-title" className='text-center' variant="h5" component="h2">
                            Update Profile
                        </Typography>
                        <TextField
                            type="text"
                            name='name'
                            label='Name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.name}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-firstname-input"
                        />
                        <TextField
                            type="text"
                            name='email'
                            label='Email'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.email}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-email-input"
                        />

                        <TextField
                            name='password'
                            type="text"
                            label='Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.password}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="current-password-input"
                        />
                        {error &&
                            <Typography className='self-center' color='error'>
                                Email already exist
                            </Typography>
                        }

                        <Button type='submit' className='bg-[#33b33d]' color='success' variant='contained'>Update Profile</Button>
                    </Box>
                </Modal>

                {/* MODAL FOR UPDATING PASSWORD */}
                <Modal
                    open={updatePassword}
                    onClose={() => setUpdatePassword(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component="form" onSubmit={handleUpdatePasswordSubmit} >
                        <Typography id="modal-modal-title" className='text-center' variant="h5" component="h2">
                            Update password
                        </Typography>
                        <TextField
                            name='currentPassword'
                            type="text"
                            label='Current Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                            error={error}
                            data-testid="current-password-input"
                        />
                        <TextField
                            name='newPassword'
                            type="text"
                            label='New Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                            error={error}
                            data-testid="new-password-input"
                        />
                        <TextField
                            name='confirmPassword'
                            type="text"
                            label='Confirm Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                            error={error}
                            data-testid="confirm-password-input"
                        />

                        <Button type='submit' className='bg-[#33b33d]' color='success' variant='contained'>Update Password</Button>
                    </Box>
                </Modal>
            </Container>

        </DashboardLayout>
    )
}
