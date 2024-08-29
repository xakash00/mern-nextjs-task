import { useEffect, useRef, useState } from 'react';

export const useSearch = (debounce = 300, initial, searchFn) => {
    const timer = useRef();
    const [text, setText] = useState();
    
    useEffect(() => {
        if (initial) {
            setText(initial);
        }
    }, [initial])
    
    useEffect(() => {
        const _debounce = text ? debounce : 0;
        if (text !== null && text !== undefined) {
            timer.current = setTimeout(() => {
                searchFn?.(text);
            }, _debounce);
        }
        
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
    }, [text, searchFn, debounce]);
    
    return {
        text,
        onChangeText: (val) => setText(val),
    }
}