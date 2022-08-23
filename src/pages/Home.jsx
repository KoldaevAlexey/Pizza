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

    React.useEffect(() => {
        async function fetchToApi() {
            let itemsResponse;

            if (activeCategory > 0) {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas?category=${activeCategory}`
                );
            } else {
                itemsResponse = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas`
                );
            }

            setItems(itemsResponse.data);
            setIsLoading(false);
        }
        fetchToApi();
    }, [activeCategory]);

    const selectCategory = (index) => {
        console.log(activeCategory);
        setActiveCategory(index);
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={activeCategory}
                    selectCategory={selectCategory}
                />
                <Sort />
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
