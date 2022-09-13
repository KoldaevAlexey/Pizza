import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    count: number;
    size: number;
    type: string;
};

interface CartSliceState {
    cartItems: CartItem[];
}

const initialState: CartSliceState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
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

        countPlus(state, action: PayloadAction<string>) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload) {
                    item.count++;
                }
            });
        },
        countMinus(state, action: PayloadAction<string>) {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload && item.count > 1) {
                    item.count--;
                }
            });
        },
        clearCart(state) {
            state.cartItems = [];
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
        },
    },
});

export const selectCartItems = (state: RootState) => state.cart;

export const { addItem, clearCart, removeItem, countPlus, countMinus } =
    cartSlice.actions;
export default cartSlice.reducer;
