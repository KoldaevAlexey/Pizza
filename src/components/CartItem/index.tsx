import React from "react";
import { useDispatch } from "react-redux";
import {
    countPlus,
    countMinus,
    removeItem,
} from "../../redux/slices/cartSlice";

export type CartItemProps = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    count: number;
    size: number;
    type: string;
};

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imageUrl,
    price,
    count,
    size,
    type,
}) => {
    const dispatch = useDispatch();

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{name}</h3>
                <p>
                    {type}, {size} см.
                </p>
            </div>
            <div className="cart__item-count">
                <div
                    onClick={() => dispatch(countMinus(id))}
                    className="button button--outline button--circle cart__item-count-minus"
                >
                    -
                </div>
                <b>{count}</b>
                <div
                    onClick={() => dispatch(countPlus(id))}
                    className="button button--outline button--circle cart__item-count-plus"
                >
                    +
                </div>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div
                    onClick={() => dispatch(removeItem(id))}
                    className="button button--outline button--circle"
                >
                    X
                </div>
            </div>
        </div>
    );
};

export default CartItem;
