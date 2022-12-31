import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicGroup {
    _id: string,
    artist: string
    picture: string
    description: string
    musics: Array<object>
}

interface IMusicGroup {
    loading: boolean
    musicGroup: MusicGroup[]
    error: boolean
}

export interface MusicPayload {
    musicGroup: MusicGroup[]
}
const initialState: IMusicGroup = {
    loading: false,
    musicGroup: [],
    error: false
}

export const MusicGroupSlices = createSlice({
    name: 'MusicGroup',
    initialState,
    reducers: {
        fetchLoading: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action: PayloadAction<MusicPayload>) => {
            state.loading = false
            state.musicGroup = action.payload.musicGroup
        },
        fetchError: (state) => {
            state.loading = true
            state.error = true
        }
    }
})

export default MusicGroupSlices.reducer