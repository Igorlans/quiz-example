import { Button } from '@/ui';
import { Page } from '@/ui';
import PageTitle from '@/ui/PageTitle/PageTitle';
import { motion } from 'framer-motion';
import './Games.scss';
import { useGameModels } from './hooks/useGameModels';
import ModelsList from './components/ModelsList';

const GamesPage = () => {
	const { isLoading, models } = useGameModels();

	return (
		<Page className='games'>
			<PageTitle title='Наші ігри' />

			<div className='games__content'>
				<ModelsList 
                    models={models}
                    isLoading={isLoading}
                />

				<Button className='max-w-[260px] px-9 py-4 text-2xl sm:mt-[40px]'>
					Читай як грати
				</Button>
			</div>
		</Page>
	);
};

export default GamesPage;
