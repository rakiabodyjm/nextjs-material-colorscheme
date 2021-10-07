import { Typography } from '@material-ui/core'
import { User } from '@src/api/userApi'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[] | undefined>()
  useEffect(() => {
    axios
      .get('/user')
      .then((res) => {
        console.log(res.data)

        setUsers(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <pre>
      {JSON.stringify(users, null, 2)}
      {/* <Typography>Lists of Users</Typography> */}
    </pre>
  )
}

export default Home
