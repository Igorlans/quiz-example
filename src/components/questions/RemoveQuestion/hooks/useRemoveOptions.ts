import { useEffect, useState } from "react"
import { shuffleArray } from "@/shared/utils/shuffleArray";
import { IRemoveQuestion, IRemoveQuestionAnswer, RemoveOption } from "@/types/questions/removeQuestion";

export const useRemoveOptions = (question: IRemoveQuestion, removedOptions: IRemoveQuestionAnswer) => {
    const [options, setOptions] = useState<RemoveOption[]>([]);

    useEffect(() => {  
        const nextOptions = question.options[removedOptions.length];
        if (!nextOptions) return;
        
        setOptions(shuffleArray(nextOptions.data))
    }, [removedOptions])

    return options;
}