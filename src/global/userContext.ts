import { createContext } from 'react';
import { User } from './firebase';

export const UserContext = createContext<User | undefined>(undefined);
