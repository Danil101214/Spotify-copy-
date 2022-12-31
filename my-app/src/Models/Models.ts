import {IMusic} from '../Redux/Slices/Music.Slices'
import { IRoles } from '../Redux/Slices/Users.Slices'

export interface UserResponseRegistration {
    email: string
    password: string | number
    user: {
        ban: string
        ban_description: string
        name?: string
    }
    token: string
    roles: string
    message: string
}

export interface UserResponse {
    email: string
    password: string | number
    user: {
        ban: string
        ban_description: string
    }
    token: string
    roles: string
    name?: string
    message: string
    status: number | string
}

export interface UsersData {
    email: string
    name?: string
    password: string
}

export interface MusicResponse<T> {
    music: T[]
}

export interface PlayerState {
    active: null | IMusic | void
    volume: number
    duration: number
    currentTime: number | void
    pause: boolean
}

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_DURATION = 'SET_DURATION',   //Активний трек.
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME'
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}

interface PauseAction {
    type: PlayerActionTypes.PAUSE
}

interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE
    payload: IMusic
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}

export type PlayerAction =
PlayAction | PauseAction | SetActiveAction | SetDurationAction | SetVolumeAction | SetCurrentTimeAction