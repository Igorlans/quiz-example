import Loader from './Loader'

interface BottomLoaderProps {
    children: string;
    className?: string;
}

const BottomLoader: React.FC<BottomLoaderProps> = ({ children, className }) => {
  return (
    <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[300px] pointer-events-none ${className ?? ''}`}>
        <div className='bg-custom_yellow flex items-center shadow-md justify-between py-3 px-7 rounded-[50px]'>
            <p className='text-xl font-bold whitespace- text-custom_purple-700 sm:text-lg'>{children}</p>
            <Loader className='border-custom_purple-700 aspect-square' />
        </div>
    </div>
  )
}

export default BottomLoader