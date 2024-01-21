import BackgroundImages from "@/components/BackgroundImages"
import {Container} from "@/ui";
import Realtime from "@/Realtime"
import { Outlet } from "react-router-dom"

/**The purpose of this layout is to render pages that are similar in both client and screen */
const GeneralLayout = () => {
  return (
    <Realtime>
        <Container>
            <Outlet />
        </Container>

        <BackgroundImages variant={5} />     
    </Realtime>
  )
}

export default GeneralLayout