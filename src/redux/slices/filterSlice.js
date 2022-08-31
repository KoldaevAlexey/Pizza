import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: "rating",
    sortingDirection: "asc",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSortingDirection(state, action) {
            state.sortingDirection = action.payload;
        },
    },
});

export const { setCategoryId, setSort, setSortingDirection } =
    filterSlice.actions;
export default filterSlice.reducer;
