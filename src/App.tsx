import {useEffect} from "react";
import { auth } from "./firebase";
import { Authentificator } from "./shared/utils/Authenticator"
import Routes from "./Routes";
import Header from "./modules/Header/Header";
import { useUserStore } from "./shared/store/userStore";
import './input.css';

function App() {
    const signIn = useUserStore(state => state.signIn)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
              const userData = Authentificator.validateData(authUser);

              if (!userData) return;

              signIn(userData);
            }
        })

        return unsubscribe
    }, [])

  return (
    <div className="wrapper">
      <Header />
      
      <main className="main">
        <Routes />
      </main>
    </div>
  )
}

export default App;
