import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setCategoryId,
    setSort,
    setSortingDirection,
    setCurrentPage,
    setSortActive,
    setFilters,
    SortTypes,
    IFilterSliceState,
} from "../redux/slices/filterSlice";

import { fetchPizzas, selectPizza } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Pagination from "../components/Pagination";

import Skeleton from "../components/PizzaCard/Skeleton";

import qs from "qs";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispath = useAppDispatch();
    const {
        categoryId,
        sort,
        sortingDirection,
        currentPage,
        sortActive,
        searchValue,
    } = useSelector((state: RootState) => state.filter);

    const { items } = useSelector(selectPizza);

    const [isLoading, setIsLoading] = React.useState(true);

    const [sortActiveClass, setSortActiveClass] = React.useState(0);
    const [openSort, setOpenSort] = React.useState(false);

    const isMounted = React.useRef(false);

    async function getPizzas() {
        const category: string = categoryId > 0 ? `category=${categoryId}` : "";
        dispath(
            fetchPizzas({
                category,
                currentPage: String(currentPage),
                sort,
                sortingDirection,
                searchValue,
            })
        );
        setIsLoading(false);
    }

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
    }, [categoryId, sort, currentPage, sortActive]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as IFilterSliceState;
            dispath(
                setFilters({
                    ...params,
                })
            );
        }
    }, []);

    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sort, sortingDirection, currentPage, searchValue]);

    const selectCategory = React.useCallback((index: number) => {
        dispath(setCategoryId(index));
    }, []);

    const selectListItem = (
        obj: {
            text: string;
            value: string;
            direction: string;
        },
        index: number
    ) => {
        dispath(setSortActive(index));
        setSortActiveClass(Number(obj.text));
        setOpenSort(false);
        if (
            obj.value === SortTypes.PRICE ||
            obj.value === SortTypes.RATING ||
            obj.value === SortTypes.NAME
        ) {
            dispath(setSort(obj.value));
        }
        dispath(setSortingDirection(obj.direction));
    };

    const pizzas = items.map((obj: any) => <PizzaCard key={obj.id} {...obj} />);

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
                onChangePage={(page: number) => dispath(setCurrentPage(page))}
            />
        </div>
    );
};

export default Home;
