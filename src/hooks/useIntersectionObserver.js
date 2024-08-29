import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = ({ elementId }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const observerRef = useRef()
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observerRef.current.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentObserver = observerRef.current;
        const target = document.querySelector(elementId);

        if (target) {
            currentObserver.observe(target);
        }

        return () => {
            if (currentObserver && target) {
                currentObserver.disconnect();
            }
        };
    }, [elementId, observerRef]);

    return [isIntersecting];
};

export default useIntersectionObserver;
