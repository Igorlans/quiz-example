import { useState, FC } from 'react'
import FormInput from '@/components/interactive/FormInput'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { PlayerRegistrationFormData } from './types';
import { SuggestedAvatarsList } from './components/SuggestedAvatarsList/SuggestedAvatarsList';
import { playerRegistrationSchema } from './schemas/playerRegistrationSchema';
import { toBase64 } from '@/shared/utils/toBase64';
import { Avatar, Button, ImageInput, ValidationError } from '@/ui';



interface QuickStartFormProps {
    onSubmit: SubmitHandler<PlayerRegistrationFormData>
} 

const PlayerRegistrationForm: FC<QuickStartFormProps> = ({onSubmit}) => {
    const [avatar, setAvatar] = useState<string>();
    const {
        register, handleSubmit, formState: {errors}, setValue
    } = useForm<PlayerRegistrationFormData>({
        resolver: yupResolver(playerRegistrationSchema),
        mode: 'onBlur'
    })

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const avatar = e.target.files?.[0];
        if (!avatar) return;
        const avatarPath = await toBase64(avatar);

        setAvatar(avatarPath)
    }

    const onAvatarPick = (avatar: string) => {
        setAvatar(avatar)
    }

  return (
    <form className='quick-start__form form' onSubmit={(e) => {
        // setting hook-form field value to avatar state
        setValue('avatar', avatar ?? null);
       

        handleSubmit(onSubmit)(e)
    }}>
        <div className="form__input-container">
            <label htmlFor="" className="form__label">Введи ім’я:</label>
            <FormInput 
                register={register('username', {required: true})} 
                className={'form__input'}
                error={errors.username?.message} 
            />  
        </div>

        <SuggestedAvatarsList onAvatarPick={onAvatarPick} />

        <div className="form__input-container">
            <label htmlFor="" className="form__label">Або завантаж своє:</label>

            <div className="form__avatar-container">
                <ImageInput 
                    register={register('avatar', {required: true})}
                    onChange={onAvatarChange}
                />
                    
                <Avatar
                    img={avatar} 
                    className='form__picked-avatar'
                />
                <ValidationError message={errors.avatar?.message || ''}  />
            </div>
        </div>

        <Button className='py-2 px-12 max-w-[200px] md:mx-auto'>
            Готово
        </Button>
    </form>
  )
}

export default PlayerRegistrationForm