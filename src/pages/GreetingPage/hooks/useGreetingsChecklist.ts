import { STORAGE } from '@/constants/storage';
import { useCallback, useEffect, useState } from 'react';

type CheckedRules = Record<ID, Maybe<boolean>>;

export const useGreetingsChecklist = () => {
	const [greetings, setGreetings] = useState<CheckedRules>({});

	useEffect(() => {
        const greetingList = getGreetingList();
        if (!greetingList) return;

        setGreetings(greetingList)
    }, []);

	const checkGreeting = useCallback((key: ID) => {
        const greetingList = getGreetingList();
        if (!greetingList) return;

		const updatedGreetingList = {
			...greetingList,
			[key]: true
		}

        localStorage.setItem(STORAGE.CHECKED_GREETINGS, JSON.stringify(updatedGreetingList));
		
		setGreetings(updatedGreetingList)
    }, []);

	const clearChecklist = useCallback(() => {
        localStorage.setItem(STORAGE.CHECKED_GREETINGS, JSON.stringify({}));
    }, []);

	return {
		greetingsChecklist: greetings,
		checkGreeting,
		clearChecklist
	};
};

const getGreetingList = () => {
	const rulesJSON = localStorage.getItem(STORAGE.CHECKED_GREETINGS);
	if (!rulesJSON) {
		return localStorage.setItem(STORAGE.CHECKED_GREETINGS, '{}');
	}

	return JSON.parse(rulesJSON) as CheckedRules;
};
