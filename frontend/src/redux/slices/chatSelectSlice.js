import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null
}

const charSelectSlice = createSlice({
    name: "chatSelect",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.selectedChat = action.payload
        }
    }
})

export const { selectChat } = charSelectSlice.actions;
export default charSelectSlice.reducer;