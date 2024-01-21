import { useEffect, useState } from "react";

interface Breakpoint {
    pixels: number;
    measureBy?: 'width' | 'height'
}

type MeasureState = 'more' | 'less' | 'equal'

export const useBreakpoint = ({pixels, measureBy = 'width'}: Breakpoint): Record<MeasureState, boolean> => {
    const [state, setState] = useState<Record<MeasureState, boolean>>({
        more: false,
        less: false,
        equal: false
    });

    useEffect(() => {
        const handleResize = () => {
            const measurePixels = measureBy === 'width' 
                ? window.innerWidth
                : window.innerHeight

            if (measurePixels > pixels) {
                setState(prev => ({
                    less: false,
                    equal: false,
                    more: true,
                }))
            } else if (measurePixels < pixels) {
                setState(prev => ({
                    less: true,
                    equal: false,
                    more: false,
                }))
            } else {
                setState(prev => ({
                    less: false,
                    equal: true,
                    more: false,
                }))
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => { window.removeEventListener('resize', handleResize); }
    }, [])

    return state;
}