import Auth from '@aws-amplify/auth';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { [key: string]: any } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    } | null>
  >;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within Auth provider');
  }
  return context;
};

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await Auth.currentAuthenticatedUser();
        setUser(res);
      } catch (error) {
        // console.error('error getting current user', error);
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        setUser,
      }}
    />
  );
};

export { AuthProvider, useAuth };
