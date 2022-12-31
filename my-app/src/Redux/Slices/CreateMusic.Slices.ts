import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateMusicPayload {
    _id: string
}

interface ICreateMusic {
    name: string
    artist: string
    text: string
    picture: string
    audio: string
    id_artist: string
    artist_id?: CreateMusicPayload[]
}

const initialState: ICreateMusic = {
    name: '',
    artist: '',
    text: '',
    picture: '',
    audio: '',
    id_artist: '',
    artist_id: []
}

export const CreateMusicSlices = createSlice({
    name: 'createMusic',
    initialState,
    reducers: {
        fetchSuccess: (state, action: PayloadAction<ICreateMusic>) => {
            state.name = action.payload.name
            state.artist = action.payload.artist
            state.text = action.payload.text
            state.picture = action.payload.picture
            state.audio = action.payload.audio
            state.id_artist = action.payload.id_artist        
        },
        fetchId: (state, action) => {
            state.artist_id?.push(action.payload)
        }
    }
})

export default CreateMusicSlices.reducer