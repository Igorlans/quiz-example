import {SiDiscord as DiscordIcon} from 'react-icons/si';
import {FaTelegramPlane as TelegramIcon} from 'react-icons/fa';
import {BsInstagram as InstagramIcon} from 'react-icons/bs';
// 
const Socials = () => {
  return (
    <section className="mt-[55px] bg-custom_purple-700 max-w-[440px] rounded-[20px] flex flex-col items-center py-[10px] sm:mt-10 sm:max-w-[400px] sm:ml-auto sm:-mr-[10%] sm:w-full xs:mt-[25px] xs:max-w-[300px]">
        <h4 className="text-center mb-2.5 text-white font-bold leading-[133%] text-2xl sm:text-xl xs:text-[16px]">Ми в соціальних мережах</h4>
        <ul className="flex justify-center gap-2.5 w-3/5 sm:w-40">
          <li className="rounded-[50%] border-[1px] border-white w-[60px] aspect-square overflow-hidden sm:w-[35px]">
            <a href="#" className="flex items-center justify-center text-white w-full h-full">
              <DiscordIcon className='scale-[200%] sm:scale-[120%]' />
            </a>
          </li>

          <li className="rounded-[50%] border-[1px] border-white w-[60px] aspect-square overflow-hidden sm:w-[35px]">
            <a href="#" className="flex items-center justify-center text-white w-full h-full">
              <TelegramIcon className='scale-[200%] sm:scale-[120%]' />
            </a>
          </li>

          <li className="rounded-[50%] border-[1px] border-white w-[60px] aspect-square overflow-hidden sm:w-[35px]">
            <a href="#" className="flex items-center justify-center text-white w-full h-full">
              <InstagramIcon className='scale-[200%] sm:scale-[120%]' />
            </a>
          </li>
        </ul>
      </section>
  )
}

export default Socials