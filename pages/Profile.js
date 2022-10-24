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
import { axiosAuth, encryptParams, verifyParams } from '../auth/authParams';

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
    const dispatch = useDispatch()

    const [updateProfile, setUpdateProfile] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const router = useRouter()


    useEffect(() => {
        console.log('useeffect checker');
    }, [])

    //HANDLES PASSWORD VALIDATION
    const validation = () => {

        if (userInfo.password.length < 7) return 'Password must be 8 characters or longer!'

        if (userInfo.password !== userInfo.confirmPassword) return 'Passwords not matched'

        return 'ok'
    }

    //HANDLES PROFILE CHANGE
    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    //OPENS UPDATE PROFILE MODAL
    const openUpdateProfile = async () => {
        setUpdateProfile(true)
        setError(false)

        const getPass = await verifyParams(log.loggedIn.token)
        const { password } = getPass

        setUserInfo({ ...userInfo, firstname: log.loggedIn.firstname, lastname: log.loggedIn.lastname, email: log.loggedIn.email, password, confirmPassword: password })
    }

    //HANDLES UPDATE PROFILE SUBMITION
    const handleUpdateProfSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        const message = validation()

        if (message === 'ok') {

            const data = { ...userInfo, role: log.loggedIn.role }

            const encryptData = await encryptParams(data)

            const profile = await axiosAuth(log.loggedIn.token).put(`/profile`, JSON.stringify(encryptData))

            if (profile?.status === 200) {
                const account = await verifyParams(profile.data)
                    .catch(err => {
                        console.log(err)
                    })

                const { accountID, email, firstname, lastname, role } = account

                dispatch(setLogged({ id: accountID, firstname: firstname, lastname: lastname, email: email, role: role, token: profile.data }))

                router.back()
            }
        } else {
            setError(true)
            setMessage(message)
        }

    }

    //--------------------------------------------------------------------

    //HANDLES PASSWORD CHANGE
    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    //OPENS UPDATE PASSWORD MODAL
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

    //HANDLES UPDATE PASSWORD SUBMITION
    const handleUpdatePasswordSubmit = (e) => {
        e.preventDefault()
        setError(false)
    }

    return (
        <DashboardLayout>
            <Container className='flex flex-col p-4 justify-center items-center'>
                <Box className='w-[300px] p-4 flex flex-col justify-center items-center rounded-md shadow-md gap-2 bg-white'>
                    <Avatar sx={{ bgcolor: green[800], width: 70, height: 70 }}>{upperCase(log.loggedIn.firstname[0])}</Avatar>

                    <Typography mt={2} color='gray' variant='h5' >{log.loggedIn.firstname}</Typography>

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
                            name='firstname'
                            label='First Name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.firstname}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-firstname-input"
                        />
                        <TextField
                            type="text"
                            name='lastname'
                            label='Last Name'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.lastname}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-lastname-input"
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
                            disabled={true}
                            value={userInfo.email}
                            onChange={handleProfileChange}
                            data-testid="update-email-input"
                        />

                        <TextField
                            type="password"
                            name='password'
                            label='Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.password}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-lastname-input"
                        />

                        <TextField
                            type="password"
                            name='confirmPassword'
                            label='Confirm Password'
                            variant="outlined"
                            color="secondary"
                            margin='normal'
                            fullWidth
                            required
                            value={userInfo.confirmPassword}
                            onChange={handleProfileChange}
                            error={error}
                            data-testid="update-lastname-input"
                        />
                        {error &&
                            <Typography className='self-center' color='error'>
                                {message}
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
