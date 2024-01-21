import { firestore } from '@/firebase';
import { connect } from '@/pages/ConnectingPage';
import { IDatabasePlayer, IPlayer } from '@/types/entities/player';
import { doc, DocumentReference } from 'firebase/firestore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { COLLECTIONS } from '@/constants/collections';
import { parsePlayer } from '@/firebase/parsers/playerParser';
import { STORAGE } from '@/constants/storage';
import { fetchDocument } from '@/firebase/api';

export interface State {
	player: Maybe<IPlayer>;
	isParsing: boolean;

	initialized: boolean;
}

export interface Actions {
	initialize: (playerId: Maybe<ID>) => Promise<void>;
	setPlayer: (player: IDatabasePlayer) => Promise<Maybe<IPlayer>>;
	reset: () => void;
	connectAction: (gameID: ID) => void;
}

export interface Computed {
	getPlayerRef: () => Maybe<DocumentReference>;
}

export const usePlayerStore = create(
	immer<State & Actions & Computed>((set, get) => ({
		player: null,
		isParsing: false,
		initialized: false,

		initialize: async (playerId) => {
			if (get().initialized) return;
			console.log('initialize player: ', playerId)

			const player = await fetchDocument<IDatabasePlayer>(
				`/${COLLECTIONS.PLAYER}/${playerId}`
			);
			if (!player.data || !player.snapshot.exists()) {
				return set((store) => {
					store.initialized = true;
				});
			}

			await get().setPlayer(player.data);
			
			return set((store) => {
				store.initialized = true;
			});
		},

		connectAction: async (gameID: ID) => {
			const playerRef = get().getPlayerRef();
			const player = get().player;

			// player must be unconnected
			if (!playerRef || !gameID || !player || player.connected) return;

			await connect(playerRef, gameID);
		},

		setPlayer: async (player) => {
			let storedPlayer = get().player;

			if (storedPlayer && storedPlayer?.id !== player.id) {
				console.warn('Player id changed instantly');
			}

			set((store) => {
				store.isParsing = true;
			});
			const parsedPlayer = await parsePlayer(player, storedPlayer);
			set((store) => {
				store.isParsing = false;
			});

			if (!parsedPlayer) return null;

			set((state) => {
				state.player = parsedPlayer;
			});

			return parsedPlayer;
		},

		reset: () => {
			set((store) => {
				store.player = null;
				store.initialized = false;
			});
		},

		getPlayerRef: () => {
			const playerID = get().player?.id;
			if (!playerID) return null;

			return doc(firestore, `${COLLECTIONS.PLAYER}/${playerID}`);
		},
	}))
);
