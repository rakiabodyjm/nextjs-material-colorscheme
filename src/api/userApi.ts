import axios, { AxiosError } from 'axios'

export interface User {
  id: string
  name: string
  email: string
  updated_at: string
}

export function getUsers() {
  /**
   * get users
   */
  axios
    .get('/users')
    .then((res: { data: User[] }) => {
      return res.data
    })
    .catch((err: AxiosError) => {
      /**
       * catch error message
       */
      throw err
    })
}
export function getUser() {}

export function registerUser() {}
