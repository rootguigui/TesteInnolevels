interface ICreateUser {
  email: string;
  name: string;
  password: string;
}

interface IJweUser {
  email: string;
  password: string;
  currentDate: Date;
}

interface IAuthUser {
  email: string;
  password: string;
}

interface IAuthVerify {
  auth: string;
}

export { ICreateUser, IJweUser, IAuthUser, IAuthVerify };
