import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (props) => {
        const { category, currentPage, sort, sortingDirection, searchValue } =
            props;
        const res = await axios.get(
            `https://62efc45857311485d127eb48.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${sortingDirection}&${category}&name=${searchValue}`
        );
        return res.data;
    }
);

const initialState = {
    items: [],
};

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.items = action.payload;
        },
    },
});

export const selectPizza = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
