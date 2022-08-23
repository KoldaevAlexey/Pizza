import React from "react";

function Categories({ activeCategory, selectCategory }) {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((title, index) => (
                    <li
                        key={index}
                        onClick={() => selectCategory(index)}
                        className={activeCategory === index ? "active" : ""}
                    >
                        {title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
