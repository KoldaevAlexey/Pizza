export const getCartFromStorage = () => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
};
