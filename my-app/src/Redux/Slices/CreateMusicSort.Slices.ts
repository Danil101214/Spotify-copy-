import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICreateMusic {
    artist: '',
    picture: '',
    description: ''
}

const initialState: ICreateMusic = {
    artist: '',
    picture: '',
    description: ''
}

export const CreateMusicSortSlices = createSlice({
    name: 'createMusicSort',
    initialState,
    reducers: {
        fetchSuccess: (state, action: PayloadAction<ICreateMusic>) => {
            state.artist = action.payload.artist
            state.picture = action.payload.picture
            state.description = action.payload.description
        }
    }
})

export default CreateMusicSortSlices.reducer