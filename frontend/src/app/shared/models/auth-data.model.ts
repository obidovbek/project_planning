export interface AuthData {
    _id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    patronymic?: string;
    ouqRole: string;
    role: string;
  }
  
  export interface UserLogin {
    email: string;
    password: string;
  }
  