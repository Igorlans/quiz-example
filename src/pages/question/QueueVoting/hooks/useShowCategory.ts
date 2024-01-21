import { useTimeout } from "@/hooks/useTimeout";
import { useEffect, useState } from "react";

export const useShowCategory = (isCategoryPicked: boolean) => {
    const [showCategory, setShowCategory] = useState(false);

    useEffect(() => {
        if (!isCategoryPicked) return;

        setShowCategory(true);
    }, [isCategoryPicked])

    useTimeout(() => setShowCategory(false), 5000);

    return showCategory
}