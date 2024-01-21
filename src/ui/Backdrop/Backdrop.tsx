import classes from './backdrop.module.scss'

interface BackdropProps {
  onClick?: () => any;
}

const Backdrop: React.FC<BackdropProps> = ({onClick}) => {
  return (
    <div onClick={() => onClick && onClick()} className={classes.backdrop}></div>
  )
}

export default Backdrop