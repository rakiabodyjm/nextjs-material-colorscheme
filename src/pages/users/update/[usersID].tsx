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
import { editUser, User, UserRegisterParams, UserResponse } from '@src/api/userApi'
import axios, { AxiosError } from 'axios'
import { Key, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const getData = await axios.get('/user').then((res) => res.data)
//   const paths = getData?.map((user) => {
//     return { params: { usersID: user.id } }
//   })
//   return { paths: paths, fallback: false }
// }

export default function EditUser() {
  const classes = useStyles()

  const router = useRouter()

  const usersID = router.query.usersID
  const { data: userData, error: userDataError } = useSWR<UserResponse>(
    '/user/' + usersID,
    (url: string) => axios.get(url).then((res) => res.data)
  )
  const [newUpdate, setNewUpdate] = useState<UserResponse | undefined>()
  useEffect(() => {
    if (userData) {
      setEditValues({
        name: userData.name,
        email: userData.email,
        password: '',
      })
    }
  }, [userData])
  const [editValues, setEditValues] = useState<UserRegisterParams>({
    name: '',
    email: '',
    password: '',
  })

  const handleUpdate = () => {
    const { email, password, name } = editValues
    editUser(
      {
        email,
        password,
        name,
      },
      usersID as string
    )
      .then((res: UserResponse) => {
        /**
         * do something with user response
         */
        // console.log(res)
        console.log(res)
        setNewUpdate(res)
      })
      .catch((err: AxiosError) => {
        err.message
        console.error(err)
      })
    router.push('/home')
  }

  if (userDataError) return <div>failed to load</div>
  if (!userData) return <div>loading...</div>

  return (
    <div>
      <Paper className={classes.paperContainer} variant="outlined">
        <Typography variant="h3" className={classes.title}>
          Edit User Profile ({userData.name})
        </Typography>
        <Divider />
        {/*Instead of doing the one below, we can shortcut it to make it rendered from state values */}
        <Box className={classes.inputContainer}>
          {Object.entries(editValues).map(([key, value]) => (
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
                  setEditValues((prevState) => ({
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
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
