import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	isCorrect?: Maybe<boolean>;
}

const CORRECT_STYLES = '!bg-success_green !opacity-100';
const WRONG_STYLES = '!bg-error_red !opacity-100';
const DISABLED_STYLES =
	'disabled:opacity-70 disabled:cursor-default disabled:hover:bg-custom_yellow disabled:hover:text-custom_purple-700';

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	isActive,
	className,
	isCorrect,
	...props
}) => {
	const classes = twMerge(
		`
      flex justify-center items-center w-full h-fit bg-custom_yellow text-custom_purple-700 font-title text-xl font-bold leading-[133%] duration-[.4s] rounded-[90px]  hover:text-white hover:bg-custom_purple-700
    
      ${isActive ? 'text-white !bg-custom_purple-700' : ''}
      ${DISABLED_STYLES}
      ${className ?? ''}
      `,
		` ${
			typeof isCorrect === 'boolean'
				? isCorrect
					? CORRECT_STYLES
					: WRONG_STYLES
				: ''
		}`
	);

	return (
		<button
			className={` ${classes}`}
			onClick={(e) => (onClick ? onClick(e) : null)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
