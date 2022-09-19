import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useState } from 'react';
import Router, { useRouter } from 'next/router';


export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [category, setCategory] = useState('Employee')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailError(false)
    setPasswordError(false)

    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }


    console.log(email, password, category);

    router.push(`/${category}`)

  }
  return (
    <div className={styles.container}>

        <div className={styles.loginContainer}>
          <Typography
          variant="h6" 
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Login
          </Typography>
          
          <form className={styles.colunmDir} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
              label="Email" 
              variant="outlined" 
              color="secondary"
              margin='normal'
              fullWidth
              required
              error={emailError}
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
              error={passwordError}
          />

          <FormControl margin='normal'>
            <FormLabel>Role</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
              <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
              <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit" 
            color="secondary" 
            variant="contained">
            Login
          </Button>
          
          </form>
        </div>
    </div>
  )
}
