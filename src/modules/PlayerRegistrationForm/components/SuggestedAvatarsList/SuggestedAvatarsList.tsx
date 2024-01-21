import { useShuffle } from "@/hooks/useShuffle";
import { Avatar } from "@/ui";
import { FC } from "react";
import { useSuggestedAvatars } from "../../hooks/useSuggestedAvatars";

interface SuggestedAvatarsListProps {
    onAvatarPick: (avatar: string) => any;
}

export const SuggestedAvatarsList: FC<SuggestedAvatarsListProps> = ({ onAvatarPick }) => {
    const suggestedAvatars = useSuggestedAvatars(); 
    const shuffledSuggestedAvatars = useShuffle(suggestedAvatars);

    return (
        <div className="form__input-container">
            <label htmlFor="" className="form__label">Та обери фото:</label>
            <ul className='form__avatar-list'>
                {shuffledSuggestedAvatars.map(avatar => (
                    <li className='form__avatar-list-item' key={avatar}>
                        <button 
                            className='form__pick-avatar-button' 
                            type='button'
                            onClick={() => onAvatarPick(avatar)}
                        >
                            <Avatar img={avatar} className='form__avatar-template' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}