import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaCard from "./components/PizzaCard";

import axios from "axios";

import "./scss/app.scss";

function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function fetchToApi() {
            const itemsResponse = await axios.get(
                "https://62efc45857311485d127eb48.mockapi.io/pizzas"
            );
            setItems(itemsResponse.data);
        }
        fetchToApi();
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>

                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((pizza) => (
                            <PizzaCard key={pizza.id} {...pizza} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
