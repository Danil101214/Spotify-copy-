import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserResponse } from '../../Models/Models'

export interface IRoles {
    value: string
    description?: string
}

export interface Users {
    email: string
    name?: string
    password: string | number
    token: string | boolean
    user: {
        //roles: string | undefined
        ban: boolean | string
        ban_description: string
    }
    isAuth: boolean | string
    roles: string
    message: string
    status: number | string
}

const EMAIL_KEY = 'Email_key'
const ROLES_KEY = 'Roles_key'
const NAME_KEY = 'Name_key'
const TOKEN_KEY = 'Token_key'
const BAN_KEY = 'Ban_key'
const BAN_DESCRIPTION_KEY = 'ban_description_key'
const IS_AUTH = 'is_auth_key'

const initialState: Users = {
    email: localStorage.getItem(EMAIL_KEY) || '',
    name: localStorage.getItem(NAME_KEY) || '',
    password: '',
    token: localStorage.getItem(TOKEN_KEY) || '',
    user: {
        ban: localStorage.getItem(BAN_KEY) || false,
        ban_description: localStorage.getItem(BAN_DESCRIPTION_KEY) || ''
    },
    isAuth: localStorage.getItem(IS_AUTH) || false,
    roles: localStorage.getItem(JSON.stringify(ROLES_KEY)) || '',
    message: '',
    status: ''
}

export const usersSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registration: (state, action: PayloadAction<UserResponse>) => {
            state.email = action.payload.email
            state.name = action.payload.name
            state.password = action.payload.password
            state.user.ban = action.payload.user.ban
            state.user.ban_description = action.payload.user.ban_description
            state.isAuth = action.payload.token ? true : false
            state.roles = action.payload.roles
            state.message = action.payload.message
            state.status = action.payload.status

            localStorage.setItem(NAME_KEY, JSON.stringify(state.name))
            localStorage.setItem(EMAIL_KEY, action.payload.email)
            localStorage.setItem(ROLES_KEY, JSON.stringify(state.roles))
            localStorage.setItem(BAN_KEY, action.payload.user.ban)
            localStorage.setItem(BAN_DESCRIPTION_KEY, action.payload.user.ban_description)
            localStorage.setItem(IS_AUTH, action.payload.token)
        },
        login: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.name = action.payload.name
            state.user.ban = action.payload.user.ban
            state.user.ban_description = action.payload.user.ban_description
            state.isAuth = action.payload.token ? true : false
            state.roles = action.payload.roles
            state.message = action.payload.message
            state.status = action.payload.status
            
            localStorage.setItem(NAME_KEY, action.payload.name)
            localStorage.setItem(EMAIL_KEY, action.payload.email)
            localStorage.setItem(JSON.stringify(ROLES_KEY), JSON.stringify(state.roles))
            localStorage.setItem(BAN_KEY, action.payload.user.ban)
            localStorage.setItem(BAN_DESCRIPTION_KEY, action.payload.user.ban_description)
            localStorage.setItem(IS_AUTH, action.payload.token)
        },
        logOut: (state) => {
            state.email = ''
            state.password = ''
            state.user.ban = ''
            state.user.ban_description = ''
            state.isAuth = false
            state.roles = ''
            state.name = ''

            localStorage.removeItem(EMAIL_KEY)
            localStorage.removeItem(ROLES_KEY)
            localStorage.removeItem(BAN_KEY)
            localStorage.removeItem(BAN_DESCRIPTION_KEY)
            localStorage.removeItem(IS_AUTH)
            localStorage.removeItem(NAME_KEY)
        }
    }
})

export default usersSlices.reducer