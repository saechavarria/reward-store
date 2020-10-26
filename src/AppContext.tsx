import {createContext} from 'react'
import { User } from './services/interfaces';

const AppContext = createContext<User>(null)

export default AppContext

