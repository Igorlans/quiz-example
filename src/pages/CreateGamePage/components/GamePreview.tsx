import { IGameModel } from "@/types/entities/game/gameModel";

interface GamePreviewProps {
    gameModel: IGameModel
}

const GamePreview: React.FC<GamePreviewProps> = ({ gameModel }) => {
  return (
    <div className="min-w-[200px] max-w-[300px] w-full flex flex-col items-center">
        <div className="w-[280px] aspect-square rounded-[30px] overflow-hidden md:w-[220px]">
          <img className="w-full h-full object-cover" src={gameModel?.image} alt='Game' /> 
        </div>
        <h5 className="text-center text-xl mt-2  md:text-xl xs:text-base text-custom_purple-700">{gameModel?.title}</h5>
    </div>
  )
}

export default GamePreview