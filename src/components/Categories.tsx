import React from "react";

type CategoriesProps = {
    categoryId: number;
    selectCategory: (arg1: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, selectCategory }) => {
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
                            className={categoryId === index ? "active" : ""}
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
);

export default Categories;
