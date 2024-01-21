import { Container } from '@/ui';
import { Outlet } from 'react-router-dom';
import BackgroundImages from '@/components/BackgroundImages';
import Realtime from '@/Realtime';


const ScreenLayout = () => {
  return (
    <Realtime>
      <Container className='screen__container'>
        <Outlet />
      </Container>
      
      <BackgroundImages variant={5} />
    </Realtime> 
  );
};

export default ScreenLayout;
