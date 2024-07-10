export type TUser = {
  id: string;
  email: string;
  phone: null;
  type: number;
  provider_id: string | null;
  provider_type: string;
  is_active: number;
  profile: {
    id: string;
    user_id: string;
    nickname: string;
    email: string;
    introduce: string;
    fullName: string;
    profile_image_url: string;
    bg_image_url: string;
    background: number;
    hashtag: string | null;
    comment: string;
    connections: null;
    is_agency: boolean;
    is_entertainment: boolean;
  };
  is_signup: boolean;
};
