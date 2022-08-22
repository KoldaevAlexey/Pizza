import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";

import Skeleton from "../components/PizzaCard/Skeleton";

import axios from "axios";

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchToApi() {
            const itemsResponse = await axios.get(
                "https://62efc45857311485d127eb48.mockapi.io/pizzas"
            );
            setItems(itemsResponse.data);
            setIsLoading(false);
        }
        fetchToApi();
    }, []);
    return (
        <>
            <div className="content__top">
                <Categories />
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
        </>
    );
};

export default Home;
