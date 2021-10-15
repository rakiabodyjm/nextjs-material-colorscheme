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
import { Delete, Edit } from '@material-ui/icons'
import { mergeClasses } from '@material-ui/styles'
import { User, UserResponse } from '@src/api/userApi'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import router, { Router, useRouter } from 'next/router'
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

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const [users, setUsers] = useState<User[] | undefined>()
  const { data } = useSWR<User[] | undefined>('/user', (url: string) =>
    axios(url).then((r) => r.data)
  )

  // useEffect(() => {
  //   axios
  //     .get('/user')
  //     .then((res) => {
  //       console.log(res.data)
  //       setUsers(res.data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [])

  return (
    // <div>
    //   <Paper className={classes.paperContainer}>
    //     <Typography variant="h5" className={classes._textAlign}>
    //       LOGIN
    //     </Typography>
    //     <Divider></Divider>
    // <Box>
    //   <Typography>Username:</Typography>
    //   <TextField
    //     className={classes._textField}
    //     fullWidth
    //     size="small"
    //     variant="outlined"
    //   ></TextField>
    //   <Typography>Password:</Typography>
    //   <TextField
    //     type={showPassword ? 'text' : 'password'}
    //     className={classes._textField}
    //     fullWidth
    //     size="small"
    //     variant="outlined"
    //     InputProps={{
    //       // <-- This is where the toggle button is added.
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <IconButton
    //             aria-label="toggle password visibility"
    //             onClick={handleClickShowPassword}
    //             onMouseDown={handleMouseDownPassword}
    //           >
    //             {showPassword ? <Visibility /> : <VisibilityOff />}
    //           </IconButton>
    //         </InputAdornment>
    //       ),
    //     }}
    //   ></TextField>
    //   <Button fullWidth variant="contained" color="primary">
    //     Login
    //   </Button>
    //   <Link href={`/register`}>
    //     <a>Register</a>
    //   </Link>
    // </Box>
    //   </Paper>
    // </div>

    <div>
      <TableContainer component={Paper} variant="outlined" className={classes.paperContainer}>
        <Typography variant="h3" className={classes._textAlign}>
          {'List of Users'}
        </Typography>
        <Table className="tableContainer" width="100%">
          <TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{'Name'}</TableCell>
                <TableCell>{'Email'}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              {data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell width="100%">{row.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={async () => {
                        const deleteUrl = '/user/' + row.id
                        const url = '/user'
                        mutate(
                          url,
                          data.filter((c) => c.id !== row.id),
                          false
                        )
                        await axios.delete(deleteUrl)
                      }}
                    >
                      <Delete></Delete>
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() =>
                        router.push({
                          pathname: '/update/[id]',
                          query: {
                            id: row.id,
                          },
                        })
                      }
                    >
                      <Edit></Edit>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableHead>
        </Table>
        <Button
          onClick={() =>
            router.push({
              pathname: '/register',
            })
          }
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </TableContainer>
    </div>
    // <pre>
    //   {JSON.stringify(users, null, 2)}
    //   {/* <Typography>Lists of Users</Typography> */}
    // </pre>
  )
}

export default Home
