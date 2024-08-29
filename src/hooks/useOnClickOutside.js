import { useEffect } from "react";

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const evListener = (e) => {
            const el = ref?.current;
            if (!el || el.contains(e?.target || null)) {
                return;
            }
            handler(e);
        }

        document.addEventListener('mousedown', evListener);
        document.addEventListener('touchstart', evListener);

        return () => {
          document.removeEventListener('mousedown', evListener);
          document.removeEventListener('touchstart', evListener);
        };
    }, [ref, handler])
}