import {createContext} from 'react'
import { IUser } from './services/interfaces';

const AppContext = createContext<IUser>(null)

export default AppContext

