import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortTypes {
    PRICE = "price",
    RATING = "rating",
    NAME = "name",
}

export interface IFilterSliceState {
    categoryId: number;
    sort: SortTypes;
    sortActive: number;
    sortingDirection: string;
    currentPage: number;
    searchValue: string;
}

const initialState: IFilterSliceState = {
    categoryId: 0,
    sort: SortTypes.RATING,
    sortActive: 0,
    sortingDirection: "asc",
    currentPage: 1,
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortTypes>) {
            state.sort = action.payload;
        },
        setSortingDirection(state, action: PayloadAction<string>) {
            state.sortingDirection = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSortActive(state, action: PayloadAction<number>) {
            state.sortActive = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sortActive = Number(action.payload.sortActive);
            state.sort = action.payload.sort;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
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
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
