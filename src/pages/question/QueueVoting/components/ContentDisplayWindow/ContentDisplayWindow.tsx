import { useRoundStore } from '@/shared/store/roundStore';
import { useShowCategory } from '../../hooks/useShowCategory';
import classes from './ContentDisplayWindow.module.scss'

interface ContentDisplayWindowProps {
	questionText: Maybe<string>;
	categoryName: Maybe<string>;
}

const ContentDisplayWindow = ({
	categoryName,
	questionText,
}: ContentDisplayWindowProps) => {
	const category = useRoundStore(state => state.round?.category);
	const showCategory = useShowCategory(!!category);

	return (
		<div
			className={`${classes['content']} ${
				showCategory ? classes['content_highlight'] : ''
			}`}
		>
			{showCategory ? categoryName : questionText}
		</div>
	);
};

export default ContentDisplayWindow;
