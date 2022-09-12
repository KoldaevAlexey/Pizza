import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchFullPizza() {
            try {
                const { data } = await axios.get(
                    `https://62efc45857311485d127eb48.mockapi.io/pizzas/` + id
                );
                setPizza(data);
            } catch (error) {
                console.log(
                    `ошибка при получении пиццы в компоненте FullPizza: ${error}`
                );
                alert("Не удалось загрузить пиццу!!!");
            }
        }
        fetchFullPizza();
    }, []);

    console.log(pizza);

    console.log("pizzzzzza-" + pizza);

    if (!pizza) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container">
            <div className="pizza-block-wrapper">
                <img src={pizza.imageUrl} />
                <p className="pizza-block__title">{pizza.name}</p>
                <span>{pizza.price} руб.</span>
                <br /> <br />
                <span>Описание, какая пицца вкусная.....</span>
            </div>
        </div>
    );
};

export default FullPizza;
