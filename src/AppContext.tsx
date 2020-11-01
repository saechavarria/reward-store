import {createContext} from 'react'
import { IAppContext } from './services/interfaces';



const AppContext = createContext<IAppContext>(null)

export default AppContext

