import { IGame } from "@/types/entities/game";
import { useEffect, useState } from "react";
import { useRealtimeDocument } from "./useRealtimeDocument";
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { useNavigate } from "react-router-dom";

export function useGame(gameId?: ID) {
    const { document: game, snapshot, exists, ...rest } = useRealtimeDocument<IGame>(buildGamePath([gameId ?? null]));
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof exists === 'boolean' && !exists) {
            console.error("Redirected to root page. Game does not exist")
            navigate('/');
        }
    }, [exists]);

    return { game, snapshot, exists, ...rest };
}