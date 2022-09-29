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


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountError, setAccountError] = useState(false)

  const dispatch = useDispatch()
  const acc = useSelector(state => state.account)

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setAccountError(false)

    const account = _.find(acc.accounts, { email: email, password: password })

    if (!account) {
      setAccountError(true)

    } else {

      dispatch(setLogged({ id: account.accountID, firstName: account.firstName, email: email, role: account.type }))

      // router.push(`/dashboard`)

      if (account.type === 'employer') router.push(`/dashboard`)

      if (account.type === 'employee') router.push(`/dashboard?role=${account.type}`)

      if (account.type === 'admin') router.push(`/dashboard?role=${account.type}`)
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
            error={accountError}
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
            error={accountError}
            data-testid="password"
          />

          {accountError &&
            <Typography className='self-center' color='error'>
              Invalid Account
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
