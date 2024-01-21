import { FC, ReactNode } from "react"
import classes from './page.module.scss'

interface PageProps {
    children: ReactNode;
    className?: string;
}


const Page: FC<PageProps> = ({ children, className }) => (
    <div className={`${classes.page} ${className ? className : ''}`}>
        {children}
    </div>
)

export default Page