import { IAuthHistoryDto } from "../dtos/auth-history.dto";
import { ICreateUserDto } from "../dtos/user.dto";
import CustomError from "../interfaces/custom-error.interface";
import { DataResponse } from "../interfaces/data-response.interface";
import { ICreateUser, IJweUser } from "../interfaces/user.interface";
import AuthHistory from "../models/auth-history";
import UserModel from "../models/user";
import { decryptJWE, encryptJWE } from "../utils/jwe";
import { comparePassword, hashPassword } from "../utils/password";

class AuthService {
  async login(email: string, password: string): Promise<DataResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const error = new CustomError("User or password is invalid", 401, []);
      throw error;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      const error = new CustomError("User or password is invalid", 401, []);
      throw error;
    }

    const jweUser: IJweUser = {
      email: user.email,
      password: user.password,
      currentDate: new Date(),
    };

    const jwe = await encryptJWE(jweUser);
    await this.saveHistory(user.email, jwe);

    return DataResponse.success("Login successful", { auth: jwe });
  }

  async history(email: string): Promise<DataResponse> {
    const history = await AuthHistory.find({ email });
    
    const response: IAuthHistoryDto[] = history.map((item) => ({
      id: item._id.toString(),
      jwe: item.jwe,
      createdAt: item.createdAt,
    }));

    return DataResponse.success("History successful", { history: response });
  }

  async register(requestUser: ICreateUser): Promise<DataResponse> {
    const { email, password, name } = requestUser;
    const user = await UserModel.findOne({ email });

    if (user) {
      const error = new CustomError("User already exists", 400, []);
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({ email, password: hashedPassword, name });

    const userDto: ICreateUserDto = {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    };

    return DataResponse.success("Register successful", { user: userDto });
  }

  async verify(auth: string): Promise<DataResponse> {
    if (!auth) throw new CustomError("Token de autenticação não fornecido", 400, []);

    const jweUser = await decryptJWE(auth);
    
    if (!jweUser.email || !jweUser.password) throw new CustomError("Token inválido ou expirado", 401, []);

    return DataResponse.success("Verification successful", { user: jweUser });
  }

  private async saveHistory(email: string, jwe: string) {
    const authHistory = await AuthHistory.create({ email, jwe });
    return authHistory;
  }
}

const authService = new AuthService();

export default authService;
