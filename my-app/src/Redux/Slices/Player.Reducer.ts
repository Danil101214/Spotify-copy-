import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicResponse, PlayerAction, PlayerState } from "../../Models/Models";

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 0,
    pause: true
}

export const PlayerSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        Pause(state, action: PayloadAction) {
            state.pause = true
        },
        Play(state, action: PayloadAction) {
            state.pause = false
        },
        Set_Current_Time(state, action: PayloadAction) {
            state.currentTime = action.payload
        },
        Set_Volume(state, action: PayloadAction) {
        },
        Set_Duration(state, action: PayloadAction) {
        },
        SetActive(state, action: PayloadAction) {
            state.active = action.payload
            state.duration = 0
            state.currentTime = 0
        }
    }
})

export default PlayerSlice.reducer