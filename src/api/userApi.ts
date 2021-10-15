import axios, { AxiosError, AxiosResponse } from 'axios'

export interface User {
  id: string
  name: string
  email: string
  updated_at: string
  password: string
}
export interface UserSelect extends Omit<User, 'name' | 'email' | 'updated_at' | 'password'> {}
export interface UserResponse extends Omit<User, 'id'> {}
export interface UserRegisterParams extends Omit<User, 'id' | 'updated_at'> {}
export interface UserUpdateParams extends Omit<User, 'id' | 'updated_at'> {}
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
      // console.log('NEWLY CREATED USER ', res?.data.message)
      return res.data as UserResponse
    })
    .catch((err: AxiosError) => {
      throw err
    })
}

export function updateUser(params: UserUpdateParams, id: string | undefined) {
  return axios
    .patch('/user/' + id, params)
    .then((res) => {
      return res.data as UserResponse
    })
    .catch((err: AxiosError) => {
      throw err
    })
}
