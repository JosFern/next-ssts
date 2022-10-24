import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged } from '../store/reducers/logged';
import axios from 'axios';
import { encryptParams, verifyParams } from '../auth/authParams';
import Image from 'next/image'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()
  const acc = useSelector(state => state.account)

  const router = useRouter()

  //handles user login submition
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError(false)
    setMessage("")

    const credentials = { email, password }

    const encryptCredentials = await encryptParams(credentials)

    const login = await axios.post('http://localhost:8080/login', JSON.stringify(encryptCredentials))
      .catch(err => {
        setLoginError(true)
        setMessage(err?.response?.data)
      })

    if (login?.status === 200) {

      const payload = await verifyParams(login.data)
        .catch(err => {
          console.log(err)
        })

      const { accountID, email, firstname, lastname, role } = payload

      dispatch(setLogged({ id: accountID, firstname: firstname, lastname: lastname, email: email, role: role, token: login.data }))

      if (role === 'employer') router.push(`/dashboard`)

      if (role === 'employee') router.push(`/dashboard?role=${role}`)

      if (role === 'admin') router.push(`/dashboard?role=${role}`)
    }

  }


  return (
    <Box className='flex justify-center items-center min-h-screen bg-[#f4faec]'>

      <Box className='min-h-[600px] min-w-[900px] grid grid-cols-2 grid-flow-row bg-[#f5f6fa] drop-shadow-2xl'>
        <Box className='inline-grid relative'>{/**class left */}
          <Image
            src="/lemons.jpg"
            alt="Picture of the lemons"
            width={500}
            height={500}
            priority={true}
          />
          <Box className='text-white text-center absolute left-[50%] bottom-[5%] transform -translate-x-[50%] -translate-y-[5%] w-[400px]'>
            <Typography className='font-bold m-0 text-2xl' variant='h2'>Lemon Quote</Typography>
            <Typography className='font-medium m-0 text-xl' variant='h4'>&quot; When life gives you lemons, you squeeze them back into life&apos; s eyes!!!&quot;</Typography>
            <Typography className='font-bold m-0 text-lg' variant='h4'>-The Amazing World of Gumball</Typography>
            <Box className='mt-[3rem] flex justify-center gap-2'>
              <Box className='w-[20px] h-[10px] bg-[#fbc531] rounded-lg'></Box>
              <Box className='w-[10px] h-[10px] bg-[#fbc531] rounded-lg'></Box>
              <Box className='w-[10px] h-[10px] bg-[#fbc531] rounded-lg'></Box>
              <Box className='w-[10px] h-[10px] bg-[#fbc531] rounded-lg'></Box>
            </Box>
          </Box>
        </Box>

        <Box className='flex flex-col items-center justify-center text-[#696969]'>
          <Typography className='font-bold m-0 text-3xl mb-[1rem]' variant='h1'>Lemondrop</Typography>
          <Typography className='font-medium m-0 text-xl' variant='h5'>Welcome to SSTS</Typography>
          <Box className='flex flex-col mt-4 w-[60%]' component="form" onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              label="Email"
              variant="standard"
              color="secondary"
              margin='normal'
              fullWidth
              required
              error={loginError}
              data-testid="email"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              variant="standard"
              color="secondary"
              margin='normal'
              fullWidth
              required
              error={loginError}
              data-testid="password"
            />

            {loginError &&
              <Typography className='self-center' color='error'>
                {message}
              </Typography>
            }

            <Button
              className='bg-[#e1b12c] text-white font-bold tracking-wide mt-4 w-[150px] py-2 self-center rounded-2xl'
              variant='contained'
              type="submit"
              disabled={!email || !password}
              data-testid="submit-btn"
            >
              Login
            </Button>

          </Box>
          <Box className='gap-1 flex items-center w-[150px] mt-3 text-[14px]'>
            <Box className='w-full border-solid border-[1px] border-gray-400 h-0'></Box>
            or
            <Box className='w-full border-solid border-[1px] border-gray-400 h-0'></Box>
          </Box>
          <Box className='flex justify-center items-center cursor-pointer gap-1 mt-4'>
            <Image
              src="/google-logo.png"
              alt="GOOGLE Logo"
              width='40px'
              height='20px'
              priority={true}
            />
            <Typography className='text-[14px]' variant='h5'>Sign in with Google</Typography>
          </Box>
          <Typography className='text-[14px] mt-6' variant='h5'>New Intern? <Box className='cursor-pointer underline underline-offset-8 text-[#1abc9c]' component='span'>Create Account</Box></Typography>
        </Box>

      </Box>
    </Box>
  )
}
