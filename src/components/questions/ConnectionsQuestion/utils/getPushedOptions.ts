import { shuffleArray } from "@/shared/utils/shuffleArray";
import { IOptions } from "@/types/questions/connectionsQuestion";

export const getPushedOptions = (
    displyedOptions: IOptions,
    unLockedOptions: IOptions,
    optionsNumber: [number, number]
): IOptions => {
    while (true) {
        const randomQuestionOptions = shuffleArray(unLockedOptions.question).filter((option, index) => {
            if (index >= optionsNumber[0]) return;

            return option;
        })

        const randomAnswerOptions = shuffleArray(unLockedOptions.answer).filter((option, index) => {
            if (index >= optionsNumber[1]) return;

            return option;
        })
        // if 1 or more connetions exist => write new options and break loop
        if (
            computeConnections({
                answer: [...displyedOptions.answer, ...randomAnswerOptions],
                question: [...displyedOptions.question, ...randomQuestionOptions],
            }) >= 1
        ) {
            return {
                answer: randomAnswerOptions,
                question: randomQuestionOptions
            };
        }
    }

    function computeConnections(options: IOptions) {
        return options.question.filter(questionOption => {
            return options.answer.some(answerOption => questionOption.key === answerOption.key)
        }).length;
    }
}


