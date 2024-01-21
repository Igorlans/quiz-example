import classes from './container.module.scss';


interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({className, children}) => {
  return (
    <div className={`${classes.container} ${className || ''}`}>
        {children}
    </div>
  )
}

export default Container