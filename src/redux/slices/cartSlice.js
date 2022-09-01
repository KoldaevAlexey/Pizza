import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCount(state, action) {
            state.count = action.payload;
        },
    },
});

export const { setCount } = cartSlice.actions;
export default cartSlice.reducer;
