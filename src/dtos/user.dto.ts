interface IUserDto {
  id: string;
  email: string;
  password?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateUserDto extends Omit<IUserDto, "password" | "updatedAt"> {}

export { IUserDto, ICreateUserDto };
