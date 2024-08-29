import { useCallback, useRef } from "react";

export default function useDeboucedFn(fn, delay = 500) {
    const timeout_id = useRef(null);

    const deboucedFn = useCallback(
        (...args) => {
            if (timeout_id.current) {
                clearTimeout(timeout_id.current);
            }
            timeout_id.current = setTimeout(() => {
                fn.call(this, ...args);
            }, delay);
        },
        [fn, delay]
    );

    return deboucedFn;
}
