import { ISortQuestionAnswer, ISortQuestion, Subject } from "@/types/questions/sortQuestion";
import { useEffect, useState } from "react";
import { useShuffleOptions } from "@/hooks/useShuffleOptions";

export const useSortSubject = (question: ISortQuestion, answer: ISortQuestionAnswer) => {
    const [subject, setSubject] = useState<Maybe<Subject>>();
    const shuffledSubjects = useShuffleOptions(question.id, question.subjects);

    useEffect(() => {
        const subjectsLeft = shuffledSubjects.filter(subject => {
            return !answer.some(answerOption => subject.name === answerOption.subject.name)
        });
        
        const nextSubject = subjectsLeft[0];
        if (!nextSubject) return;
        
        setSubject(nextSubject);
    }, [answer, shuffledSubjects])

    return subject;
}