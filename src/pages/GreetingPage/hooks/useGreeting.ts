import { IGreeting } from '../types';
import { useEffect, useRef, useState } from 'react';
import { useGreetingsChecklist } from '@/pages/GreetingPage/hooks/useGreetingsChecklist';
import { useGameEntity } from '@/hooks/useGameEntity';

export const useGreeting = (entityId: Maybe<ID>) => {
	const [greeting, setGreeting] = useState<Maybe<IGreeting>>(null);
    const { entity } = useGameEntity(entityId);
	const [docId, setDocId] = useState<ID>();
	const { greetingsChecklist } = useGreetingsChecklist();

	useEffect(() => {
		if (!entity) return

        setDocId(entity.id);
        setGreeting(entity.greeting ?? null);
	}, [entity]);

	return {
		greeting,
		docId,
		isChecked: greetingsChecklist[docId ?? ''],
	};
};
