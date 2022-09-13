import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (props: Record<string, string>) => {
        const { category, currentPage, sort, sortingDirection, searchValue } =
            props;
        const { data } = await axios.get<PizzaItem[]>(
            `https://62efc45857311485d127eb48.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${sortingDirection}&${category}&name=${searchValue}`
        );
        return data;
    }
);

type PizzaItem = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[];
};

interface PizzaSliceState {
    items: PizzaItem[];
}

const initialState: PizzaSliceState = {
    items: [],
};

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>): void {
            state.items = action.payload;
        },
    },

    extraReducers: (bulider) => {
        bulider.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const selectPizza = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
