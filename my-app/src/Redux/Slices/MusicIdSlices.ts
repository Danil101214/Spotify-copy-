import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusic } from "./Music.Slices";
import { MusicGroup, MusicPayload } from "./MusicGroup.Slices";

interface IMusicId {
    loading: boolean
    music: MusicGroup | null
    musicsGroup: IMusic[]
    error: boolean
}

interface MusicIdPayload {
    music: {
        music: MusicGroup,
        musicsGroup: IMusic[]
    }
}

const initialState: IMusicId = {
    loading: false,
    music: null,
    musicsGroup: [],
    error: false
}


export const MusicIdSlices = createSlice({
    name: 'MusicId',
    initialState,
    reducers: {
        fetchLoading: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action: PayloadAction<MusicIdPayload>) => {
            state.loading = false
            state.music = action.payload.music.music
            state.musicsGroup = action.payload.music.musicsGroup
        },
        fetchError: (state) => {
            state.loading = true
            state.error = true
        }
    }
})

export default MusicIdSlices.reducer