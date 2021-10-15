import {
  Box,
  Button,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'
import { registerUser, User, UserRegisterParams, UserResponse } from '@src/api/userApi'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
export default function RegisterUser() {
  const classes = useStyles()
  const router = useRouter()
  const [errors, setErrors] = useState<string | undefined>()
  const [formValues, setFormValues] = useState<UserRegisterParams>({
    name: '',
    email: '',
    password: '',
  })
  const [newlyCreatedUser, setNewlyCreatedUser] = useState<User | undefined>()

  const handleSubmit = () => {
    const { email, password, name } = formValues
    registerUser({
      email,
      password,
      name,
    })
      .then((res: UserResponse) => {
        /**
         * do something with user response
         */
        // console.log(res)
        setNewlyCreatedUser(res)
      })
      .catch((err: AxiosError) => {
        err.message
        console.error(err)
      })

    // const { email, password, name } = formValues

    // axios
    //   .post('/user', {
    //     email,
    //     password,
    //     name,
    //   })
    //   .then((res) => {
    //     setNewlyCreatedUser(res.data.entity as User)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
    router.push('/home')
  }

  useEffect(() => {
    console.log('changes in newlyCreatedUser', newlyCreatedUser)
  }, [newlyCreatedUser])
  // const dataObject = { key: 'value', key2: 'value2' }
  // Object.keys(dataObject)
  // /**
  //  * ['key', 'key2']
  //  */

  // Object.values(dataObject)
  // /**
  //  * ['value', 'value2']
  //  */

  // Object.entries(dataObject)
  // /**
  //  * [['key', 'value1'], ['key2', 'value2']]
  //  */

  return (
    <div>
      <Paper className={classes.paperContainer} variant="outlined">
        <Typography variant="h3" className={classes.title}>
          User Registration
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

          {/* <div>
            <Typography variant="body1">Name</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div>

          <div>
            <Typography variant="body1">Email</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div>

          <div>
            <Typography variant="body1">Password</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div> */}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
