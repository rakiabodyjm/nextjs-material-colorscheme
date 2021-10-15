import {
  Typography,
  Button,
  Box,
  Divider,
  makeStyles,
  Paper,
  TextField,
  useTheme,
} from '@material-ui/core'
import { registerUser, User, UserRegisterParams1, UserResponse } from '@src/api/userApi'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    maxWidth: 480,
    margin: 'auto',
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 600,
  },
  inputContainer: {
    paddingTop: 0,
    '& > div': {
      marginBottom: 8,
    },
  },
}))

const Home: NextPage = () => {
  const classes = useStyles()
  const [errors, setErrors] = useState<string | undefined>()
  const [formValues, setFormValues] = useState<UserRegisterParams1>({
    email: '',
    password: '',
  })
  const [newlyCreatedUser, setNewlyCreatedUser] = useState<User | undefined>()
  const router = useRouter()

  const handleLogin = () => {
    router.push('/home')
  }
  const handleRegister = () => {
    router.push('/register')
  }
  return (
    <div>
      <Paper className={classes.paperContainer} variant="outlined">
        <Typography variant="h3" className={classes.title}>
          User Login
        </Typography>

        <Divider />
        {/*Instead of doing the one below, we can shortcut it to make it rendered from state values */}
        <Box className={classes.inputContainer}>
          {Object.entries(formValues).map(([key, value]) => (
            <div key={key}>
              <Typography variant="body1">
                {key.charAt(0).toUpperCase() + key.slice(1)} :
              </Typography>
              <TextField
                {...(key === 'password' && { type: 'password' })}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    [key]: e.target.value,
                  }))
                }}
                value={value}
              />
            </div>
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleRegister} variant="contained" color="primary">
            Register
          </Button>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Home
