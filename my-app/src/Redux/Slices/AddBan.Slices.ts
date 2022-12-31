import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../Page/AddBan/AddBan";

interface PayloadBan {
    _id: string
}

interface AddBanInitial {
    id_user?: string
    ban: boolean
    ban_description: string
    user?: PayloadBan[]
}

const initialState: AddBanInitial = {
    ban: false,
    ban_description: '',
    id_user: '',
    user: []
}

export const addBan = createSlice({
    name: 'addBan',
    initialState,
    reducers: {
        fetchSuccess: (state, action: PayloadAction<AddBanInitial>) => {
            state.ban = action.payload.ban
            state.ban_description = action.payload.ban_description
            state.id_user = action.payload.id_user
        },
        fetchId: (state, action) => {
            state.user?.push(action.payload)
        }
    }
})

export default addBan.reducer