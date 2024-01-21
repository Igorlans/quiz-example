import { useGameStore } from "@/shared/store/gameStore";
import { usePlayersStore } from "@/shared/store/playersStore";
import { IDatabasePlayer } from "@/types/entities/player";
import { useMemo } from "react";
import { v4 as generateId } from 'uuid';


export const useTemplatePlayers = () => {
  const players = usePlayersStore(state => state.players);
  const playersLimit = useGameStore(state => state.game?.playersLimit);


  const templatePlayers = useMemo(() => {
      if (!playersLimit) return;

      const result: IDatabasePlayer[] = [];

  
      for (let i = 0; i < playersLimit; i++) {
        const player: IDatabasePlayer = players[i]
          ? {
            ...players[i],
            id: players[i].id
          } as IDatabasePlayer
          : {
              id: generateId(),
              username: `Гравець ${i + 1}`,
              connected: false,
              scores: [],
              game: null,
              avatar: '',
              activeQuestion: null,
            };
        result.push(player);
      }
  
      return result;
    }, [players, playersLimit]);

  return templatePlayers;
}