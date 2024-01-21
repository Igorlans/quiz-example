import { Button } from '@/ui'
import PageTitle from "@/ui/PageTitle/PageTitle"
import { Link } from "react-router-dom";
import { Page } from '@/ui';
import Socials from './components/Socials';

const MainPage = () => {
  return (
    <Page className="flex flex-col">
      <PageTitle
        className="!w-fit !pr-[80px]"
        title={
          <>
            <p className="leading-[120%] text-4xl md:text-2xl">Ласкаво просимо до</p>
            <p className="leading-[120%] text-5xl md:text-4xl">Smart-Fun</p>
          </>
        }
      >
        <div className="absolute right-0 bottom-0 text-custom_purple-700 leading-[160%] text-6xl font-bold font -rotate-[15deg] translate-y-[30%] translate-x-[5%] md:text-5xl sm:text-4xl">
          friends
        </div>
      </PageTitle>

      <div className="mt-[5%] leading-[133%] font-medium text-2xl max-w-[395px] sm:text-xl sm:max-w-[300px] sm:flex-grow xs:text-sm xs:mt-[22px] xs:max-w-[230px]">
        Інтерактивне дозвілля для друзів, 
        що знаходяться на відстані, 
        або навіть поруч
      </div>

      <section className="mt-[5%] flex-grow sm:flex-grow-0">
        <h2 className="max-w-[410px] mb-6 leading-[105%] text-5xl font-black text-custom_purple-700 md:text-4xl md:mb-4 sm:text-2xl sm:mb-2.5 sm:max-w-[250px] xs:text-xl xs:max-w-[170px]">Тицяй на кнопку та починаємо</h2>

        <Link to={'registration'}>
          <Button className="max-w-[340px] py-[9px] px-4 leading-[133%] font-semibold rounded-[90px] text-2xl sm:text-xl sm:py-1.5 sm:px-3 sm:max-w-[200px] xs:text-lg xs:py-1 xs:px-2">
            зареєструватися
          </Button>
        </Link>
      </section>

      <Socials />
    </Page>
  )
}

export default MainPage