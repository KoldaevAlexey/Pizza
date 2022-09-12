import React from "react";

type SortProps = {
    sortActiveClass: number;
    indexSortActiveClass: number;
    setOpenSort: (arg1: boolean) => void;
    openSort: boolean;
    selectListItem: (
        arg1: {
            text: string;
            value: string;
            direction: string;
        },
        arg2: number
    ) => void;
};

type SortItem = {
    text: string;
    value: string;
    direction: string;
};

type ClickOutsideEvent = React.MouseEvent<HTMLBodyElement> & {
    path: Node[];
};

const Sort: React.FC<SortProps> = ({
    sortActiveClass,
    indexSortActiveClass,
    setOpenSort,
    openSort,
    selectListItem,
}) => {
    const sortRef = React.useRef<HTMLDivElement>(null);

    const popUpItems: SortItem[] = [
        {
            text: "популярности",
            value: "rating",
            direction: "asc",
        },
        { text: "цене (возрастание)", value: "price", direction: "asc" },
        { text: "цене (убывание)", value: "price", direction: "desc" },
        { text: "алфавиту", value: "name", direction: "asc" },
    ];

    React.useEffect(() => {
        const handlerClickOutside = (e: ClickOutsideEvent) => {
            if (!e.path.includes(sortRef.current)) {
                setOpenSort(false);
            }
        };

        document.body.addEventListener("click", handlerClickOutside);

        return () => {
            document.body.removeEventListener("click", handlerClickOutside);
        };
    }, []);

    const closeSort = () => {
        setOpenSort(!openSort);
    };

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => closeSort()}>
                    {popUpItems[indexSortActiveClass].text}
                </span>
            </div>
            {openSort && (
                <div className="sort__popup">
                    <ul>
                        {popUpItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => selectListItem(item, index)}
                                className={
                                    sortActiveClass === index ? "active" : ""
                                }
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
