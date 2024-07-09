import { useState, useEffect, useRef } from 'react';

export const useResizeObserver = (ref: any) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            });
        });

        if (observeTarget) {
            resizeObserver.observe(observeTarget);
        }

        return () => {
            if (observeTarget) {
                resizeObserver.unobserve(observeTarget);
            }
        };
    }, [ref]);

    return dimensions;
};
