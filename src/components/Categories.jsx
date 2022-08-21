import React from "react";

function Categories() {
    const [activeCategory, setActiveCategory] = React.useState(0);

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
                        onClick={() => setActiveCategory(index)}
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
