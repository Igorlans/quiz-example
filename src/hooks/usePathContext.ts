import { STORAGE } from "@/constants/storage";
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const usePathContext = (): Maybe<'client' | 'screen'> => {
    const {pathname} = useLocation();
 
    const getPathContext = (path: string) => {
        if (path.includes('/client')) {
            return 'client'
        } else if (path.includes('/screen')) {
            return 'screen'
        }

        return localStorage.getItem(STORAGE.SAVED_PATH_CONTEXT)as Maybe<'client' | 'screen'>
    }

    useEffect(() => {
        const pathContext = getPathContext(pathname);
        
        
        if (pathContext === 'client' || pathContext === 'screen') {          
            localStorage.setItem(STORAGE.SAVED_PATH_CONTEXT, pathContext)
        }
    }, [pathname])


    return getPathContext(pathname) ?? null;
}