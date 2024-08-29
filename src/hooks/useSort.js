import { useCallback, useState } from "react";

const useSort = () => {
    const [tableSort, setTableSort] = useState({
        sort: "name",
        order: false
    });

    const sorting = useCallback((str) => {
        setTableSort((p) => ({
            ...p,
            sort: str,
            order: !p.order
        }));
    }, []);

    const order = tableSort.order === false ? "ASC" : "DESC";
    const field = tableSort.sort;

    return { sorting, order, field };
};

export default useSort;
