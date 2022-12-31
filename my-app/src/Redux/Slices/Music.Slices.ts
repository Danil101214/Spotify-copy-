import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicResponse } from "../../Models/Models";
import { MusicGroup } from "./MusicGroup.Slices";

export interface IMusic {
    name: string
    artist: string
    text: string
    picture: string
    audio: string | null
    createdAt: string | number | Date
    _id: string
}

interface MusicPayload {
    track?: IMusic[]
    album?: MusicGroup[]
}

interface Music {
    track?: IMusic[]
    album?: MusicGroup[]
    loading: boolean
    error: boolean
}

const initialState: Music = {
    track: [],
    album: [],
    loading: false,
    error: false
}
export const MusicSlices = createSlice({
    name: 'music',
    initialState,
    reducers: {
        fetchLoading: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action: PayloadAction<MusicPayload>) => {
            state.loading = false
            state.track = action.payload.track
            state.album = action.payload.album
        },
        fetchError: (state) => {
            state.loading = true
            state.error = true
        }
    }
})

export default MusicSlices.reducer