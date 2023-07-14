export interface UserInfo {
  username: string;
  name: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
}

export interface MessageBody {
  message: string;
}

export interface LoginResponseBody {
  user: {
    username: string;
    name: string;
  };
}

export interface RegisterResponseBody {
  username: string;
}
