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
    const [openSort, setOpenSort] = React.useState(false);

    const { searchValue } = React.useContext(SearchContext);

    /*     const isMounted = React.useRef(false);
    const isSearch = React.useRef(false); */

    async function fetchPizzas() {
        const category = categoryId > 0 ? `category=${categoryId}` : "";

        await axios
            .get(
                `https://62efc45857311485d127eb48.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${sortingDirection}&${category}&name=${searchValue}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    }

    // доработать этот блок позже, не подгружается главная страница без фильтров, остальное все работает
    /* React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispath(setFilters({ ...params }));
        }
        isSearch.current = true;
    }, []);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sort,
                sortActive,
                currentPage,
            });
            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sort, currentPage, sortActive]); */

    React.useEffect(() => {
        /* if (!isSearch.current) { */
        fetchPizzas();
        /* } */
        /* isSearch.current = false; */
    }, [categoryId, sort, sortingDirection, currentPage, searchValue]);

    const selectCategory = (index) => {
        dispath(setCategoryId(index));
    };

    const selectListItem = (obj, index) => {
        dispath(setSortActive(index));
        setSortActiveClass(obj.text);
        setOpenSort(false);
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
                    openSort={openSort}
                    setOpenSort={setOpenSort}
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
