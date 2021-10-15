import {
  Box,
  Button,
  Typography,
  Table,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  makeStyles,
  TableRow,
  Link,
} from '@material-ui/core'
import { User } from '@src/api/userApi'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    boxShadow: '1px 13px 15px black',
    maxWidth: 600,
    marginTop: theme.spacing(5),
    margin: 'auto',
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  _textAlign: {
    textAlign: 'center',
  },
  _textField: {
    marginBottom: theme.spacing(3),
  },
  _deleteBtn: {
    backgroundColor: 'red',
  },
}))

export default function Home() {
  const router = useRouter()
  const classes = useStyles()
  const { data, error } = useSWR<User[] | undefined>('/user', (url: string) =>
    axios(url).then((res) => res.data)
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const handleLogout = () => {
    router.push('/')
  }
  const handleEdit = (usersID: string) => {
    console.log(usersID)
    router.push({
      pathname: '/users/update/[usersID]',
      query: { usersID: usersID },
    })
  }
  const handleRegister = () => {
    router.push('/register')
  }

  // const handleDelete = async (usersID: string) => {
  //   // const deleteURL = axios.defaults.baseURL + '/user/' + usersID
  //   const url = axios.defaults.baseURL + '/user'
  //   // mutate(
  //   //   url,
  //   //   data?.filter((users) => users.id !== usersID),
  //   //   false
  //   // )
  //   // await axios.delete(deleteURL)
  //   // trigger(url)
  //   // console.log(url)
  //   mutate(
  //     url,
  //     data?.filter((users) => users.id !== usersID),
  //     false
  //   )
  //   await axios
  //     .delete(url + '/' + usersID)
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  return (
    <div>
      <div className="headerHome">
        <Typography variant="h3" className={classes._textAlign}>
          Lists of Users
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Logout
        </Button>
      </div>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre>
      {users?.map((users) => (
        <div key={users.id} className="users-list">
          <div className="users">
            <p>{users.name}</p>
            <p>{users.email}</p>
          </div>
        </div>
      ))} */}
      <Paper>
        <TableContainer>
          <Table className="tableContainer" width="100%">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Update At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((users) => (
                <TableRow key={users.name}>
                  <TableCell>{users.name}</TableCell>
                  <TableCell>{users.email}</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>{users.updated_at}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(users.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        // handleDelete(users.id)
                        const deleteURL = '/user/' + users.id
                        const url = '/home'
                        mutate(
                          url,
                          data.filter((users) => users.id !== users.id),
                          false
                        )
                        await axios.delete(deleteURL)
                        console.log('Deleted User: ' + users.name)
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button onClick={() => handleRegister()} variant="contained" color="primary">
        Register
      </Button>
    </div>
  )
}
