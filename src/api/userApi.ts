import axios, { AxiosError, AxiosResponse } from 'axios'

export interface User {
  id: string
  name: string
  email: string
  updated_at: string
  password: string
}

export interface UserResponse extends Omit<User, 'id'> {}
export interface UserRegisterParams extends Omit<User, 'id' | 'updated_at'> {}
export function getUsers() {
  /**
   * get users
   */
  axios
    .get('/user')
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

export function registerUser(params: UserRegisterParams) {
  return axios
    .post('/user', params)
    .then((res) => {
      return res.data as UserResponse
    })
    .catch((err: AxiosError) => {
      throw err
    })
}
