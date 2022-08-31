import React, { createContext } from "react";

import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const SearchContext = createContext("");

function App() {
    const [searchValue, setSearchValue] = React.useState("");

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
