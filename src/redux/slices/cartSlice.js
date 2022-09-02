import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cartItems.push(action.payload);
        },
        clearCart(state) {
            state.cartItems = [];
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
