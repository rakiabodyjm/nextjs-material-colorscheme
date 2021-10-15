import {
  Typography,
  Box,
  hexToRgb,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Paper,
  makeStyles,
  Button,
  Divider,
  TextField,
  Input,
  IconButton,
  InputAdornment,
  Link,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios, { AxiosError } from 'axios'
import router, { useRouter } from 'next/router'
import { updateUser, UserRegisterParams, UserResponse, UserUpdateParams } from '@src/api/userApi'

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    boxShadow: '1px 13px 15px black',
    maxWidth: 400,
    marginTop: theme.spacing(5),
    margin: 'auto',
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 600,
    textAlign: 'center',
  },
  _textAlign: {
    textAlign: 'center',
  },
  _textField: {
    marginBottom: theme.spacing(3),
  },
  _btnSubmit: {
    backgroundColor: 'green',
  },
  _deleteBtn: {
    backgroundColor: 'red',
  },
}))

export default function Id() {
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()

  const { id } = router.query
  const { data: userData, error: userDataError } = useSWR<UserResponse>('/user/' + id, (url) =>
    axios.get(url).then((res) => res.data)
  )
  console.log(userData)
  useEffect(() => {
    if (userData) {
      setInput({
        name: userData.name,
        email: userData.email,
        password: '',
      })
    }
  }, [userData])

  const [input, setInput] = useState<UserRegisterParams>({
    name: '',
    email: '',
    password: '',
  })

  console.log(input)
  const [newUpdate, setNewUpdate] = useState<UserResponse | undefined>()

  const handleUpdate = () => {
    const { email, password, name } = input
    const { id } = router.query
    updateUser(
      {
        email,
        password,
        name,
      },
      id as string
    )
      .then((res: UserResponse) => {
        /**
         * do something with user response
         */
        console.log(res)
        setNewUpdate(res)
        alert('UPDATE SUCCESS')
        router.push({
          pathname: '/',
        })
      })
      .catch((err: AxiosError) => {
        err.message
        console.error(err)
        alert('UPDATE FAILED')
        router.push({
          pathname: '/',
        })
      })
  }

  return (
    <div>
      {/* {JSON.stringify(input, null, 2)} */}

      <Paper className={classes.paperContainer}>
        <Typography variant="h3" className={classes.title}>
          UPDATE USER
        </Typography>
        <Divider />
        <Box>
          {Object.entries(input).map(([key, value]) => (
            <div key={key}>
              <Typography>{key.charAt(0).toUpperCase() + key.slice(1)} </Typography>

              <TextField
                {...(key === 'password' && { type: 'password' })}
                fullWidth
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setInput((prevState) => ({
                    ...prevState,
                    [key]: e.target.value,
                  }))
                }}
                value={value}
                {...console.log(value)}
              ></TextField>
            </div>
          ))}
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}
