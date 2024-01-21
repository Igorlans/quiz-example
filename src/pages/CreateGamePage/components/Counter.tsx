import { useCounterStore } from '../store/counterStore';

const Counter = () => {
	const playersCount = useCounterStore((state) => state.count);
	const increment = useCounterStore((state) => state.increment);
	const decrement = useCounterStore((state) => state.decrement);
	const isMax = useCounterStore((state) => state.isMax);
	const isMin = useCounterStore((state) => state.isMin);

	return (
		<div className='flex flex-col items-center'>
			<h2 className='text-4xl leading-[133%] mx-auto w-[90%] text-custom_purple-700 md:text-3xl md:text-center xs:text-2xl'>
				Обирай кількість гравців та GO !
			</h2>

			<div className='flex items-center gap-10 my-7 lg:gap-7 xs:my-5 xs:gap-4'>
				<button
					className='duration-[.3s] text-custom_purple-700 font-content font-black text-4xl border-2 border-solid border-custom_purple-700 rounded-full w-[40px] h-[40px] text-center flex justify-center items-center md:w-[30px] md:h-[30px] md:text-2xl'
					disabled={isMin()}
					onClick={decrement}
				>
					-
				</button>

				<div className='border-[3px] border-custom_purple-700 rounded-[67px] text-[2.5rem] w-[280px] text-center py-2.5 px-8 font-extrabold md:text-4xl md:py-2 md:px-6 md:w-[200px] xs:w-[120px] xs:text-2xl'>{playersCount}</div>

				<button
					className='duration-[.3s] text-custom_purple-700 font-content font-black text-4xl border-2 border-solid border-custom_purple-700 rounded-full w-[40px] h-[40px] text-center flex justify-center items-center md:w-[30px] md:h-[30px] md:text-2xl'
					disabled={isMax()}
					onClick={increment}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default Counter;
