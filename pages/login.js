import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setLogged } from '../store/reducers/logged';
import axios from 'axios';
import { encryptParams, verifyParams } from '../auth/authParams';
// import * as jose from 'jose'
// import jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// dotenv.config()


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

      console.log(payload);

      const { email, firstname, lastname, role } = payload

      dispatch(setLogged({ firstName: firstname, lastName: lastname, email: email, role: role, token: login.data }))

      if (role === 'employer') router.push(`/dashboard`)

      if (role === 'employee') router.push(`/dashboard?role=${role}`)

      if (role === 'admin') router.push(`/dashboard?role=${role}`)
    }

  }


  return (
    <Box className='flex justify-center items-center min-h-screen bg-[#f4faec]'>

      <Container className='w-[300px] bg-white p-4 rounded-md shadow-2xl flex flex-col justify-center items-center text-gray-700'>
        <Typography
          className='text-2xl'
          variant="h6"
          component="h2"
          gutterBottom
        >
          Login
        </Typography>

        <Box className='flex flex-col' component="form" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Email"
            variant="outlined"
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
            variant="outlined"
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
            className='bg-[#e1b12c] text-white font-bold tracking-wide mt-4'
            variant='contained'
            type="submit"
            data-testid="submit-btn"
          >
            Login
          </Button>

        </Box>
      </Container>
    </Box>
  )
}
