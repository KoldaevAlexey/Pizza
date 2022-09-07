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

import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { selectPizza } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Pagination from "../components/Pagination";

import Skeleton from "../components/PizzaCard/Skeleton";

import qs from "qs";

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const {
    categoryId,
    sort,
    sortingDirection,
    currentPage,
    sortActive,
    searchValue,
  } = useSelector((state) => state.filter);

  const { items } = useSelector(selectPizza);

  const [isLoading, setIsLoading] = React.useState(true);

  const [sortActiveClass, setSortActiveClass] = React.useState(0);
  const [openSort, setOpenSort] = React.useState(false);

  const isMounted = React.useRef(false);

  async function getPizzas() {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    dispath(
      fetchPizzas({
        category,
        currentPage,
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
      const params = qs.parse(window.location.search.substring(1));
      dispath(setFilters({ ...params }));
    }
  }, []);

  React.useEffect(() => {
    getPizzas();
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
        <Categories categoryId={categoryId} selectCategory={selectCategory} />
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
      <Pagination onChangePage={(number) => dispath(setCurrentPage(number))} />
    </div>
  );
};

export default Home;
