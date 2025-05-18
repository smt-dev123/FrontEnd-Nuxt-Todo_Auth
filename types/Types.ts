export interface Tasks {
  title: string;
  description: string;
  status?: string;
  image?: File | null;
}

export interface User {
  // id: number;
  username?: string;
  email: string;
  role: string;
  password: string;
  profile?: string | null;
}
