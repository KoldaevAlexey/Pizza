import React from "react";
import { Link } from "react-router-dom";

import {
    clearCart,
    countPlus,
    countMinus,
    removeItem,
} from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
    const { cartItems, totalPrice, totalCount } = useSelector(
        (state) => state.cart
    );
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(removeItem(id));
    };

    return (
        <div className="container">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title"> Корзина</h2>
                    <div className="cart__clear">
                        <span onClick={() => dispatch(clearCart())}>
                            Очистить корзину
                        </span>
                    </div>
                </div>
                <div className="content__items">
                    {cartItems.length === 0
                        ? ""
                        : cartItems.map((item) => (
                              <div key={item.id} className="cart__item">
                                  <div className="cart__item-img">
                                      <img
                                          className="pizza-block__image"
                                          src={item.imageUrl}
                                          alt="Pizza"
                                      />
                                  </div>
                                  <div className="cart__item-info">
                                      <h3>{item.name}</h3>
                                      <p>тонкое тесто, 26 см.</p>
                                  </div>
                                  <div className="cart__item-count">
                                      <div
                                          onClick={() =>
                                              dispatch(countMinus(item))
                                          }
                                          className="button button--outline button--circle cart__item-count-minus"
                                      >
                                          -
                                      </div>
                                      <b>{item.count}</b>
                                      <div
                                          onClick={() =>
                                              dispatch(countPlus(item))
                                          }
                                          className="button button--outline button--circle cart__item-count-plus"
                                      >
                                          +
                                      </div>
                                  </div>
                                  <div className="cart__item-price">
                                      <b>{item.price * item.count} ₽</b>
                                  </div>
                                  <div className="cart__item-remove">
                                      <div
                                          onClick={() => deleteItem(item.id)}
                                          className="button button--outline button--circle"
                                      >
                                          X
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            {" "}
                            Всего пицц: <b>{totalCount} шт.</b>{" "}
                        </span>
                        <span>
                            {" "}
                            Сумма заказа: <b>{totalPrice} ₽</b>{" "}
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/">
                            <div className="button button--outline button--add go-back-btn">
                                <span>Вернуться назад</span>
                            </div>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
