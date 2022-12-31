import {Dispatch} from '@reduxjs/toolkit'
import axios from '../utils/axios'
import { Users, usersSlices } from '../Redux/Slices/Users.Slices'
import { UsersData, UserResponse, UserResponseRegistration} from '../Models/Models'
import { AppDispatch } from '../Redux'
import { toast } from 'react-toastify'
export const UsersAxios = (data: UsersData) => {
    return async (dispatch: AppDispatch) => {
        try {
        const response = await axios.post<UserResponse>('auth/registration', data)
        console.log(response.data.roles)
        dispatch(usersSlices.actions.registration({
            email: data.email,
            password: data.password,
            name: data.name,
            token: response.data.token,
            user: {
                //roles: response.data.user.roles,
                ban_description: response.data.user.ban_description,
                ban: response.data.user.ban
            },
            roles: response.data.roles,
            message: response.data.message,
            status: response.statusText
        }))
        console.log(response.statusText)
        if(response.data.token) {
            localStorage.setItem('token', response.data.token)
        }
        } catch (error) {
            console.log(error)
        }
    }
}

export const AuthUsersAxios = (data: any) => {
    return async (dispatch: AppDispatch) => {
        try {
        const response = await axios.post<UserResponseRegistration>('auth/login', data)
        console.log(response.data.roles)
        dispatch(usersSlices.actions.login({
            email: data.email,
            password: data.password,
            token: response.data.token,
            user: {
                //roles: response.data.user.roles,
                ban_description: response.data.user.ban_description,
                ban: response.data.user.ban
            },
            roles: response.data.roles,
            name: response.data.user.name,
            message: response.data.message,
            status: response.statusText
        }))
        console.log(response.statusText)

        if(response.data.token) {
            localStorage.setItem('token', response.data.token)
        }
        } catch (error) {
            console.log(error)
        }
    }
}