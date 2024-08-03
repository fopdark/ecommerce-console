// import { TUser } from "@/types/user";
import { ReactNode, createContext, useState } from 'react';

export const CommonContext = createContext({
  access_token: '',
  // user: {
  //   id: "",
  //   email: "",
  //   phone: null,
  //   type: 0,
  //   provider_id: null,
  //   provider_type: "",
  //   is_active: 0,
  //   profile: {
  //     id: "",
  //     user_id: "",
  //     nickname: "",
  //     email: "",
  //     introduce: "",
  //     fullName: "",
  //     profile_image_url: "",
  //     bg_image_url: "",
  //     background: 0,
  //     hashtag: null,
  //     comment: "",
  //     connections: null,
  //     is_agency: false,
  //     is_entertainment: false,
  //   },
  //   is_signup: false,
  // },
  handleSetUser: (user: any | {}) => {},
  handleSetAccessToken: (token: string | null) => {},
});

function CommonProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string>('');

  const handleSetUser = (user: any) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleSetAccessToken = (token: any) => {
    console.log('handleSetAccessToken');
    setToken(token);
    localStorage.setItem('access_token', JSON.stringify(token || ''));
  };

  const commonValue: any = {
    access_token: token,
    user: user,
    handleSetUser,
    handleSetAccessToken,
  };

  return (
    <CommonContext.Provider value={commonValue}>
      {children}
    </CommonContext.Provider>
  );
}
export default CommonProvider;
