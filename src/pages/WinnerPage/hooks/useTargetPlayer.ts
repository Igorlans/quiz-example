import { COLLECTIONS } from "@/constants/collections";
import { fetchDocument } from "@/firebase/api";
import { usePathContext } from "@/hooks/usePathContext";
import { useGameStore } from "@/shared/store/gameStore";
import { usePlayerStore } from "@/shared/store/playerStore";
import { IPlayer } from '@/types/entities/player';
import { useEffect, useState } from "react"

export const useTargetPlayer = () => {
    const [targetPlayer, setTargetPlayer] = useState<IPlayer>();
    const pathContext = usePathContext();
    const player = usePlayerStore(state => state.player)
    const gameWinner = useGameStore(state => state.game?.winner);


    useEffect(() => {
        const loadPlayer = async () => {
            if (pathContext === 'client' && player) {
              setTargetPlayer(player);
            } else if (pathContext === 'screen' && gameWinner) {
              const player = await fetchDocument<IPlayer>(`${COLLECTIONS.PLAYER}/${gameWinner}`);
      
              player.data && setTargetPlayer(player.data);
            }
          };
      
          loadPlayer();
    }, [pathContext, gameWinner])

    return targetPlayer;
}