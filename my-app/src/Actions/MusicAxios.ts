import { Dispatch } from "redux"
import { MusicResponse } from "../Models/Models"
import { AppDispatch } from "../Redux"
import { IMusic, MusicSlices } from "../Redux/Slices/Music.Slices"
import { MusicGroup } from "../Redux/Slices/MusicGroup.Slices"
import axios from '../utils/axios'

type TrackAndAlbum = IMusic[] | MusicGroup[]
export const trackAxios = (query: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(MusicSlices.actions.fetchLoading())
            const response = await axios.get<IMusic[]>('search/track', {params: {query}})
            dispatch(MusicSlices.actions.fetchSuccess({
                track: response.data
            }))   
        } catch (error) {
            console.log(error)
        }
    }
}

export const AlbumAxios = (query: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(MusicSlices.actions.fetchLoading())
            const response = await axios.get<MusicGroup[]>('search/album', {params: {query}})
            dispatch(MusicSlices.actions.fetchSuccess({
                album: response.data
            }))   
        } catch (error) {
            console.log(error)
        }
    }
}