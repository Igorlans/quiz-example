import { IGreeting } from './types'
import ScreenGreetingPage from './screen/ScreenGreetingPage'
import ClientGreetingPage from './client/ClientGreetingPage'
import { useGreetingsChecklist } from './hooks/useGreetingsChecklist'
import { useGreeting } from './hooks/useGreeting'

export { ClientGreetingPage, ScreenGreetingPage, useGreetingsChecklist, useGreeting }
export type { IGreeting }