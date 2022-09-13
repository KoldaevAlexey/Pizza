import { Link } from "react-router-dom";

import { clearCart, TCartItem } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem/index";
import { selectCartItems } from "../redux/slices/cartSlice";

const Cart: React.FC = () => {
    const { cartItems } = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (
            acc: number,
            item: {
                price: number;
                count: number;
            }
        ) => acc + item.price * item.count,
        0
    );

    const totalCount = cartItems.reduce(
        (
            acc: number,
            item: {
                count: number;
            }
        ) => acc + item.count,
        0
    );

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
                        : cartItems.map((item: TCartItem) => (
                              <CartItem key={item.id} {...item} />
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
};

export default Cart;
