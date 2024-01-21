import classes from './page-title.module.scss';

interface PageTitleProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({title, children, className}) => {
  return (
    <div className={`${classes.title__container} ${className || ''}`}>
        <h1 className={classes.title}>{title}</h1>
        {children}
    </div>
  )
}

export default PageTitle