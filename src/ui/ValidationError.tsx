interface ValidationErrorProps {
  message: string;
} 

const ValidationError: React.FC<ValidationErrorProps> = ({message}) => {
  return (
    <div className='absolute bottom-0 translate-y-full text-error_red text-xs leading-[133%] mt-2 max-w-[400px] w-[98%] sm:text-[.6rem]'>{message}</div>
  )
}

export default ValidationError