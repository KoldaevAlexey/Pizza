import React from "react";
import {
    countPlus,
    countMinus,
    removeItem,
    TCartItem,
} from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/store";

const CartItem: React.FC<TCartItem> = ({
    id,
    name,
    imageUrl,
    price,
    count,
    size,
    type,
}) => {
    const dispatch = useAppDispatch();

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
