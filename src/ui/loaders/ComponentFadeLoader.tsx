import Loader from "./Loader"

interface ComponentFadeLoaderProps {
    className?: string;
}

const ComponentFadeLoader = ({ className }: ComponentFadeLoaderProps) => {
  return (
    <div className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-30 flex justify-center items-center">
        <Loader className={`${className ?? ''}`}  />
    </div>
  )
}

export default ComponentFadeLoader