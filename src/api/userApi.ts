import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export interface User {
  id: string
  name: string
  email: string
  updated_at: string
  password: string
}

export interface UserResponse extends Omit<User, 'id'> {}
export interface UserRegisterParams extends Omit<User, 'id' | 'updated_at'> {}
export interface UserRegisterParams1 extends Omit<User, 'id' | 'updated_at' | 'name'> {}
export interface UserRegisterParams2 extends Omit<User, 'updated_at' | 'password'> {}
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
      console.log('NEWLY CREATED USER')
      return res.data as UserResponse
    })
    .catch((err: AxiosError) => {
      throw err
    })
}
export function editUser(params: UserRegisterParams, id: string | undefined) {
  return axios
    .patch('/user/' + id, params)
    .then((res) => {
      console.log('EDITED USER')
      return res.data as UserResponse
    })
    .catch((err: AxiosError) => {
      throw err
    })
}
