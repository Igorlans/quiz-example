import { useGreetingsChecklist } from '@/pages/GreetingPage';
import { useGameStore } from '@/shared/store/gameStore';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePathContext } from './usePathContext';
import { useRoundRedirect } from './useRoundRedirect';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useGameEntity } from './useGameEntity';
import { GameEntity } from '@/types/entities/game';

export const useGreetingNavigate = () => {
    const focus = useGameStore(state => state.game?.gameState.focus)
	const navigate = useNavigate();
	const { gameId, tourId, roundId } = useParams();
	const { checkGreeting, greetingsChecklist } = useGreetingsChecklist();
	const { segments } = useGameEntity(focus?.round ?? null);
	const pathContext = usePathContext();
	const { startingPageNavigate } = useRoundRedirect();
	const [nextEntity, setNextEntity] = useState<Maybe<GameEntity>>();
	const { pathname } = useLocation();
	const { entity: currentEntity } = useGameEntity(
		pathname.includes('greeting') 
			? roundId || tourId || gameId || null
			: null
	);
	const [isReady, setIsReady] = useState(false);

	const isOnGreetingPage = pathname.includes('greeting');

	useEffect(() => {
		setIsReady(!!focus?.round && !!segments?.length)
	}, [focus, segments])

	useEffect(() => {
		if (!segments) return

		const firstUnchecked = segments?.find((segment) => {
			if (!segment) return;

            // entity's greeting should be not checked and should be not skipped and is not current entity
			return (
				!greetingsChecklist[segment.id] &&
				!segment.greeting?.skip &&
				(currentEntity ? segment.id !== currentEntity.id : true)
			);
		});

        setNextEntity(firstUnchecked);
	}, [segments, pathname, greetingsChecklist, currentEntity]);

	const checkCurrentGreeting = () => {
		if (!currentEntity) return;

		checkGreeting(currentEntity.id);
	}

	const navigateToReadyPage = () => {
		navigate(`/${pathContext}/${buildGamePath([gameId ?? null, focus?.tour ?? null, focus?.round ?? null])}/ready`)
	}

	const nextGreetingRedirect = () => {
		let isOver = false;
		// push to the array all entities ids that are coming before nextEntity and next entity itself. Entities after nextEntity won't be pushed
		const segmentsIds = segments?.reduce<ID[]>((acc, segment) => {
			if (isOver || !segment) return acc;

			if (nextEntity?.id === segment?.id) {
				isOver = true;
			}

			return [...acc, segment.id];
		}, []);

        navigate(`/${pathContext}/${buildGamePath(segmentsIds ?? [])}/greeting`);
	}

	const redirect = () => {
		if (pathContext === 'screen') {
			// if user is on screen page and he is already on greeting page => then the next redirect will be to the round content
			if (isOnGreetingPage) {
				checkCurrentGreeting();
				startingPageNavigate();
			} else {
				nextGreetingRedirect();
			}
		} else if (pathContext === 'client') {
			if (isOnGreetingPage) {
				checkCurrentGreeting();
			}

			if (!nextEntity) {
				return navigateToReadyPage();
			}

			nextGreetingRedirect();
		}
	}

	return {
		isReady, 
		redirect,
		nextEntity
	};
};
