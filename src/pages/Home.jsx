import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setCategoryId,
    setSort,
    setSortingDirection,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Pagination from "../components/Pagination";

import Skeleton from "../components/PizzaCard/Skeleton";

import axios from "axios";

import { SearchContext } from "../App";

const Home = () => {
    const dispath = useDispatch();
    const { categoryId, sort, sortingDirection } = useSelector(
        (state) => state.filter
    );

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortActiveClass, setSortActiveClass] = React.useState(0);
    const [indexSortActiveClass, setSortIndexActiveClass] = React.useState(0);
    const [openSortPopularity, setOpenSortPopularity] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);

    const { searchValue } = React.useContext(SearchContext);

    React.useEffect(() => {
        async function fetchToApi() {
            let itemsResponse;

            if (categoryId > 0) {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${sortingDirection}&category=${categoryId}&name=${searchValue}`
                );
            } else {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${sortingDirection}&name=${searchValue}`
                );
            }

            setItems(itemsResponse.data);

            setIsLoading(false);
        }
        fetchToApi();
    }, [categoryId, sort, sortingDirection, currentPage, searchValue]);

    const selectCategory = (index) => {
        dispath(setCategoryId(index));
    };

    const selectListItem = (obj, index) => {
        setSortIndexActiveClass(index);
        setSortActiveClass(obj.text);
        setOpenSortPopularity(false);
        dispath(setSort(obj.value));
        dispath(setSortingDirection(obj.direction));
    };

    const pizzas = items.map((obj) => <PizzaCard key={obj.id} {...obj} />);

    const skeletons = [...new Array(8)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    selectCategory={selectCategory}
                />
                <Sort
                    sortActiveClass={sortActiveClass}
                    indexSortActiveClass={indexSortActiveClass}
                    openSortPopularity={openSortPopularity}
                    setOpenSortPopularity={setOpenSortPopularity}
                    selectListItem={selectListItem}
                />
            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? <>{skeletons}</> : <>{pizzas}</>}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;
