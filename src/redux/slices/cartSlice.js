import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const duplicate = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (duplicate) {
                duplicate.count++;
            } else {
                state.cartItems.push(action.payload);
                action.payload.count = 1;
            }
        },

        countPlus(state, action) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload) {
                    item.count++;
                }
            });
        },
        countMinus(state, action) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload && item.count > 1) {
                    item.count--;
                }
            });
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

export const { addItem, clearCart, removeItem, countPlus, countMinus } =
    cartSlice.actions;
export default cartSlice.reducer;
