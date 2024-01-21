import { useNavigate } from "react-router-dom"
import { useGreetingNavigate } from "./useGreetingNavigate";
import { usePathContext } from "./usePathContext";

export const useScreenFinishedRoundNavigate = () => {
    const navigate = useNavigate();
    const pathContext = usePathContext();
    const { nextEntity, isReady, redirect: greetingRedirect } = useGreetingNavigate();

    return () => {
        if (pathContext !== 'screen') {
            return console.error('Should use only on screen pages')
        }

        if (isReady && nextEntity) {
            greetingRedirect();
        } else {
            navigate('../results', { replace: true });
        }
    }
}