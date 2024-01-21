import FormInput from "@/components/interactive/FormInput";
import { ValidationErrorMessages } from "@/errors/inputValidationErrors";
import { Button } from "@/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


export interface RangeQuestionFormData {
	answer: number;
}

interface AnswerFormProps {
    initialValue?: number;
    disabled?: boolean;
    onSubmit: (answer: RangeQuestionFormData) => void;
    questionId: ID;
}

const AnswerForm = ({ onSubmit, initialValue, disabled, questionId }: AnswerFormProps) => {
    const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RangeQuestionFormData>({
		mode: 'onBlur',
        defaultValues: {
            answer: initialValue
        }
	});

    useEffect(() => {
        reset();
    }, [questionId])

	return (
		<form
			className='range-question__answer-form'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='range-question__answer-container'>
				<label
					htmlFor=''
					className='range-question__answer-label'
				>
					Введи Число
				</label>

				<FormInput
                    disabled={disabled}
					className='range-question__answer-input'
					error={errors.answer?.message}
					register={register('answer', {
						required: true,
						valueAsNumber: true,
						pattern: {
							value: /^(0|[1-9]\d*)(\.\d+)?$/,
							message: ValidationErrorMessages.numberOnly,
						},
					})}
				/>
			</div>

			<Button
				disabled={disabled}
				className='h-[40px] max-w-[230px] w-full'
			>
				Готово
			</Button>
		</form>
	);
};

export default AnswerForm;
