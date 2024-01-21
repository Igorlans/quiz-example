import { getRandomNumber } from "@/shared/utils/getRandomNumber";
import { IOptions } from "@/types/questions/connectionsQuestion";
import { inRange } from "@/helpers/inRange";

/**
 * Computes how many options to push
 * 
 * @returns An array of options to push for each option type (first number question options, second - answer options)
*/
export const getPushOptionsNumber = (
    displyedOptions: IOptions
) => {
    let loopIndex = 0;

    while (true) {
        loopIndex += 1
        if (loopIndex > 3000) {
            return [1, 1] as [number, number];
        }

        // can push only from 0 to 2 options to each row
        const answerNumber = getRandomNumber(0, 2);
        const questionsNumber = getRandomNumber(0, 2);

        if (
            inRange(1, 3, questionsNumber + displyedOptions.question.length)
            && inRange(1, 3, answerNumber + displyedOptions.answer.length)
            && (answerNumber + questionsNumber == 2)
        ) {
            return [questionsNumber, answerNumber] as [number, number];
        };
    }
}   