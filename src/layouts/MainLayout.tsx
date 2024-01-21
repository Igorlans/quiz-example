import BackgroundImages from '@/components/BackgroundImages';
import { Container } from '@/ui';
import { Outlet } from 'react-router-dom'


interface MainLayoutProps {
  bgVariant: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({bgVariant}) => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>

      <BackgroundImages variant={bgVariant} />
    </>
  )
}

export default MainLayout