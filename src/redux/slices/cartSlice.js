import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalCount: 0,
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

            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.count,
                0
            );
            state.totalCount = state.cartItems.reduce(
                (acc, item) => acc + item.count,
                0
            );
        },

        countPlus(state, action) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
            });
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.count,
                0
            );
            state.totalCount = state.cartItems.reduce(
                (acc, item) => acc + item.count,
                0
            );
        },
        countMinus(state, action) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
            });
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.count,
                0
            );
            state.totalCount = state.cartItems.reduce(
                (acc, item) => acc + item.count,
                0
            );
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.count,
                0
            );
            state.totalCount = state.cartItems.reduce(
                (acc, item) => acc + item.count,
                0
            );
        },
    },
});

export const { addItem, clearCart, removeItem, countPlus, countMinus } =
    cartSlice.actions;
export default cartSlice.reducer;
