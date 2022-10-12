

import { UserTypes } from '@/models/types/user_type';
import { createContext } from 'react';

interface LoginContextProps {
  username: string;
  role: UserTypes;
  setRole?: any;
  setUsername?: any;
  setShowProfile?: any;
}

export const LoginContext = createContext<LoginContextProps | null>({
  username:'',
  role: 'BRAND',
  setRole(){},
  setUsername(){},
  setShowProfile(){}
});
