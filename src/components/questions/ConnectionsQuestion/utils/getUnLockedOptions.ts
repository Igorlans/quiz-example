import { IConnectionsOption, IConnectionsOptionType, IConnectionsQuestionAnswer, IOptions } from "@/types/questions/connectionsQuestion";

/**
 * 
 * @param answer locked pairs
 * @param optionsList all options in the question
 */
export const getUnLockedOptions = <T extends IConnectionsOptionType>(type: T, optionsList: IConnectionsOption<T>[], displayedOptions: IConnectionsOption<T>[], answer: IConnectionsQuestionAnswer) => {
    const unLockedOptions = optionsList.filter(option => {
        // if option is found by key in locked pairs array then it is locked
        const isLocked = answer.find(pair => pair[type].key === option.key);
        const isDisplayed = displayedOptions.find(displayedOption => displayedOption.key === option.key)

        return !isLocked && !isDisplayed;
    })

    return unLockedOptions;
}