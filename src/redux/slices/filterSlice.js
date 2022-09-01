import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: "rating",
    sortActive: 1,
    sortingDirection: "asc",
    currentPage: 1,
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
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSortActive(state, action) {
            state.sortActive = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.sortActive = Number(action.payload.sortActive);
        },
    },
});

export const {
    setCategoryId,
    setSort,
    setSortingDirection,
    setCurrentPage,
    setSortActive,
    setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
