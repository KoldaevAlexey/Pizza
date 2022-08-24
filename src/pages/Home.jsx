import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";

import Skeleton from "../components/PizzaCard/Skeleton";

import axios from "axios";

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [activeCategory, setActiveCategory] = React.useState(0);

    const [sortActiveClass, setSortActiveClass] = React.useState(0);
    const [indexSortActiveClass, setSortIndexActiveClass] = React.useState(0);
    const [openSortPopularity, setOpenSortPopularity] = React.useState(false);
    const [valueSort, setValueSort] = React.useState("rating");
    const [directionSort, setDirectionSort] = React.useState("asc");

    React.useEffect(() => {
        async function fetchToApi() {
            let itemsResponse;

            if (activeCategory > 0) {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas?sortBy=${valueSort}&order=${directionSort}&category=${activeCategory}`
                );
            } else {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas?sortBy=${valueSort}&order=${directionSort}`
                );
            }

            setItems(itemsResponse.data);

            setIsLoading(false);
        }
        fetchToApi();
    }, [activeCategory, valueSort, directionSort]);

    const selectCategory = (index) => {
        setActiveCategory(index);
    };

    const selectListItem = (obj, index) => {
        setSortIndexActiveClass(index);
        setSortActiveClass(obj.text);
        setOpenSortPopularity(false);
        setValueSort(obj.value);
        setDirectionSort(obj.direction);
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={activeCategory}
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
                {isLoading ? (
                    [...new Array(8)].map((_, index) => (
                        <Skeleton key={index} />
                    ))
                ) : (
                    <>
                        {items.map((pizza) => (
                            <PizzaCard key={pizza.id} {...pizza} />
                        ))}{" "}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
