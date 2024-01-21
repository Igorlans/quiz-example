import { AnyConnectionOption } from "@/types/questions/connectionsQuestion";
import { Button } from "@/ui";
import {motion} from 'framer-motion'

interface OptionProps {
    option: AnyConnectionOption;
    onClick: (option: AnyConnectionOption) => any;
    highlight?: Maybe<'correct' | 'wrong'>;
    isActive?: boolean;
    disabled?: boolean;
    isCorrect?: Maybe<boolean> 
}
  
const Option: React.FC<OptionProps> = ({ option, onClick, disabled, isActive, isCorrect }) => {

    return (
        <motion.li 
            className="connections-question__option"
        >
            <Button
                className='connections-question__option-button block min-h-[60px] py-3 px-6'
                isActive={isActive}
                disabled={disabled}
                isCorrect={isCorrect}
                onClick={(e) => {
                    e.stopPropagation()
                    onClick(option)
                }}
            >
                <p className='connections-question__button-text'>
                    {option.value}
                </p>
            </Button>
        </motion.li>
    )
}
  
export default Option