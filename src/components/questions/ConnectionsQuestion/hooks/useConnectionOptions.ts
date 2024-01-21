import { useEffect, useState } from "react";
import { IConnectionsOption, IConnectionsQuestionAnswer, IConnectionsQuestion, IOptions } from "@/types/questions/connectionsQuestion";
import { getPushOptionsNumber } from "../utils/getPushOptionsNumber";
import { getUnLockedOptions } from "../utils/getUnLockedOptions";
import { getPushedOptions } from "../utils/getPushedOptions";

export const useConnectionOptions = (question: IConnectionsQuestion, lockedPairs: IConnectionsQuestionAnswer) => {
    const [questionOptions, setQuestionOptions] = useState<IConnectionsOption<'question'>[]>([]);
    const [answerOptions, setAnswerOptions] = useState<IConnectionsOption<'answer'>[]>([]);

    const updateQuestionOptions = (newOptions: IConnectionsOption<'question'>[]) => {
        setQuestionOptions(prev => [...prev, ...newOptions]);
    }

    const updateAnswerOptions = (newOptions: IConnectionsOption<'answer'>[]) => {
        setAnswerOptions(prev => [...prev, ...newOptions]);
    }

    const getRemovedOptions = (): IOptions => {
        const newQuestionOptions =  questionOptions.filter(option => {
            return !lockedPairs.some(pair => pair.question.key === option.key)
        })

        const newAnswerOptions =  answerOptions.filter(option => {
            return !lockedPairs.some(pair => pair.answer.key === option.key)
        })

        return {
            answer: newAnswerOptions,
            question: newQuestionOptions
        };
    }

    useEffect(() => {
        setAnswerOptions([]);
        setQuestionOptions([]);
    }, [question])

    useEffect(() => {
        if (lockedPairs.length >= question.question.options.length) return;
        const removedOptions = getRemovedOptions();
        
        setQuestionOptions(removedOptions.question);
        setAnswerOptions(removedOptions.answer);


        if (!questionOptions.length || !answerOptions.length) {
            return setFirstOptions();
        }
 
        if (removedOptions.answer.length + removedOptions.question.length >= 4) return;

        // get not used options
        const unLockedOptions: IOptions = {
            answer: getUnLockedOptions('answer', question.answer.options, removedOptions.answer, lockedPairs),
            question: getUnLockedOptions('question', question.question.options, removedOptions.question, lockedPairs),
        } 

        // get options count to push for every row
        const optionsToPush = getPushOptionsNumber({
            answer: removedOptions.answer,
            question: removedOptions.question
        });

        const newOptions = getPushedOptions(
            {answer: removedOptions.answer, question: removedOptions.question},
            unLockedOptions,
            optionsToPush
        );

        updateQuestionOptions(newOptions.question);
        updateAnswerOptions(newOptions.answer);
    }, [lockedPairs])

    const setFirstOptions = () => {
        const unLockedOptions: IOptions = {
            answer: getUnLockedOptions('answer', question.answer.options, [], lockedPairs),
            question: getUnLockedOptions('question', question.question.options, [], lockedPairs),
        }

        const options = getPushedOptions(
          {answer: [], question: []},
          unLockedOptions,
          [2, 2]
        );

        setAnswerOptions(options.answer);
        setQuestionOptions(options.question);
      }

    return {
        questionOptions,
        answerOptions
    }
}