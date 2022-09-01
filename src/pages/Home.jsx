import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setCategoryId,
    setSort,
    setSortingDirection,
    setCurrentPage,
    setSortActive,
    setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Pagination from "../components/Pagination";

import Skeleton from "../components/PizzaCard/Skeleton";

import axios from "axios";
import qs from "qs";

import { SearchContext } from "../App";

const Home = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { categoryId, sort, sortingDirection, currentPage, sortActive } =
        useSelector((state) => state.filter);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortActiveClass, setSortActiveClass] = React.useState(0);
    const [openSortPopularity, setOpenSortPopularity] = React.useState(false);

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

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispath(setFilters({ ...params }));
        }
    }, []);

    React.useEffect(() => {
        const queryString = qs.stringify({
            categoryId,
            sort,
            sortActive,
            currentPage,
        });
        navigate(`?${queryString}`);
    }, [categoryId, sort, currentPage, sortActive]);

    const selectCategory = (index) => {
        dispath(setCategoryId(index));
    };

    console.log(sortActive);

    const selectListItem = (obj, index) => {
        dispath(setSortActive(index));
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
                    indexSortActiveClass={sortActive}
                    openSortPopularity={openSortPopularity}
                    setOpenSortPopularity={setOpenSortPopularity}
                    selectListItem={selectListItem}
                />
            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? <>{skeletons}</> : <>{pizzas}</>}
            </div>
            <Pagination
                onChangePage={(number) => dispath(setCurrentPage(number))}
            />
        </div>
    );
};

export default Home;
