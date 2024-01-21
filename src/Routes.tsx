import { Route, Routes as ReactRoutes } from "react-router-dom"
import { ClientLayout, MainLayout, ScreenLayout, GeneralLayout } from "./layouts"
import { 
  AuthPage, 
  CreateGamePage, 
  GamesPage,
  MainPage,
  ProfilePage,
  ScreenConnectingPage,
  ClientConnectingPage, 
  WinnerPage, 
  ClientCategoryVotingPage, 
  ScreenCategoryVotingPage, 
  ClientReadyPage, 
  ClientQuickStartPage,
  FinalStarsPage,
  TotalStarsPage,
  ClientResultsPage,
  ScreenResultsPage,
  GameFinishPage,
  ClientGreetingPage,
  ScreenGreetingPage,
  ClientBlitzDefault,
  ScreenBlitzDefault,
  ClientQueueFinale,
  ScreenQueueFinale,
  ClientQueueVoting,
  ScreenQueueVoting
} from "./pages"
import ProtectedRoute from "./components/ProtectedRoute"




const Routes = () => {
  return (
    <ReactRoutes>
        <Route path="/" element={<MainLayout bgVariant={1} />}>
            <Route index element={<MainPage/>} />
            <Route path="login/" element={<AuthPage authType={'login'} />} />
            <Route path="registration/" element={<AuthPage authType={'registration'} />} />
        </Route>

        <Route path="/" element={<MainLayout bgVariant={2} />}>
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Route>

        <Route path="/" element={<MainLayout bgVariant={3} />}>
          <Route path="games" element={<GamesPage />} />
        </Route>

        <Route path="/" element={<MainLayout bgVariant={4} />}>
          <Route path="games/create/:modelId" element={<ProtectedRoute><CreateGamePage /></ProtectedRoute>} />
        </Route>

        <Route path='/games/:gameId/' element={<GeneralLayout />}>
          <Route path="final_screen" element={<GameFinishPage />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client/games/:gameId/" element={<ClientLayout />}>
          <Route path="quick-start" element={<ClientQuickStartPage />} />
          <Route path="connecting" element={<ClientConnectingPage />} />
          <Route path="greeting/" element={<ClientGreetingPage />} />
          <Route path="winner" element={<WinnerPage />} />

          <Route path="stars/total" element={<TotalStarsPage />} />
          <Route path="stars/final" element={<FinalStarsPage />} />
        </Route>

        <Route path="/client/games/:gameId/tours/:tourId/" element={<ClientLayout />}>
          <Route path="greeting/" element={<ClientGreetingPage />} />
        </Route>

        <Route path="/client/games/:gameId/tours/:tourId/rounds/:roundId/" element={<ClientLayout />}>
          <Route path="category_voting" element={<ClientCategoryVotingPage />} />
          <Route path="results" element={<ClientResultsPage />} />
          <Route path="ready" element={<ClientReadyPage />} />
          <Route path="greeting/" element={<ClientGreetingPage />} />

          {/* Question pages */}
          <Route path="blitz_default/" element={<ClientBlitzDefault />} />
          <Route path="queue_voting/" element={<ClientQueueVoting />} />
          <Route path="queue_finale/" element={<ClientQueueFinale />} />
        </Route>

        {/* Screen routes */}
        <Route path="/screen/games/:gameId/" element={<ScreenLayout />}>
          <Route path="connecting" element={<ScreenConnectingPage />} />
          <Route path="greeting/" element={<ScreenGreetingPage />} />
          <Route path="winner/" element={<WinnerPage />} />

          <Route path="stars/total" element={<TotalStarsPage />} />
          <Route path="stars/final" element={<FinalStarsPage />} />
        </Route>

        <Route path="/screen/games/:gameId/tours/:tourId/" element={<ScreenLayout />}>
          <Route path="greeting/" element={<ScreenGreetingPage />} />
        </Route>

        <Route path="/screen/games/:gameId/tours/:tourId/rounds/:roundId/" element={<ScreenLayout />}>
          <Route path="greeting/" element={<ScreenGreetingPage />} />
          <Route path="results/" element={<ScreenResultsPage />} />
          <Route path="category_voting/" element={<ScreenCategoryVotingPage />} />

          {/* Question pages */}
          <Route path="blitz_default/" element={<ScreenBlitzDefault />} />
          <Route path="queue_voting/" element={<ScreenQueueVoting />} />
          <Route path="queue_finale/" element={<ScreenQueueFinale />} />
        </Route>
      </ReactRoutes>
  )
}

export default Routes