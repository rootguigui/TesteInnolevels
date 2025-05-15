import UserModel from "../../src/models/user";
import authService from "../../src/services/auth.service";
import * as passwordUtils from "../../src/utils/password";
import * as jweUtils from "../../src/utils/jwe";
import AuthHistory from "../../src/models/auth-history";

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.mock('../../src/utils/password', () => ({
      __esModule: true,
      comparePassword: jest.fn()
    }));
    jest.mock("../../src/utils/jwe", () => ({
      encryptJWE: jest.fn(),
    }));
    jest.mock("../../src/models/user", () => ({
      findOne: jest.fn(),
      create: jest.fn(),
    }));
    jest.mock("../../src/models/auth-history", () => ({
      create: jest.fn(),
    }));
  });

  it("should be able to login a user - success", async () => {
    const userMock = { email: "test@test.com", password: "123456", name: "Test User" };

    jest.spyOn(UserModel, "findOne").mockResolvedValue(userMock as any);
    jest.spyOn(passwordUtils, "comparePassword").mockResolvedValue(true);
    jest.spyOn(jweUtils, "encryptJWE").mockResolvedValue("teste");
    jest.spyOn(AuthHistory, "create").mockResolvedValue({ _id: "123456" } as any);

    const user = await authService.login(userMock.email, userMock.password);
    expect(user).toBeDefined();
  });

  it("should not be able to login a user - user not found", async () => {
    const userMock = { email: "test@test.com", password: "123456", name: "Test User" };

    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
    
    try {
      await authService.login(userMock.email, userMock.password);
      fail("Era esperado um erro, mas o login foi bem-sucedido");
    } catch (error: any) {
      expect(error.message).toBe("User or password is invalid");
      expect(error.statusCode).toBe(401);
    }
  });

  it("should be able to register a user", async () => {
    const userMock = {
      id: "123456",
      email: "test@test.com",
      password: "123456",
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    jest.spyOn(UserModel, "findOne").mockResolvedValue(null);
    jest.spyOn(UserModel, "create").mockResolvedValue({ ...userMock, _id: "123456" } as any);

    const user = await authService.register({
      email: "test@test.com",
      password: "123456",
      name: "Test User"
    });

    expect(user).toBeDefined();
  });

  it("should be able to verify a user", async () => {
    const userMock = {
      email: "test@test.com",
      password: "123456",
      name: "Test User"
    };

    jest.spyOn(jweUtils, "decryptJWE").mockResolvedValue(userMock as any);
    jest.spyOn(UserModel, "findOne").mockResolvedValue(userMock as any);

    const user = await authService.verify("test");

    expect(user).toBeDefined();
  });

  it("should be able to history a user", async () => {
    const userMock = {
      email: "test@test.com",
      password: "123456",
      name: "Test User"
    };

    const authHistoryMock = {
      email: "test@test.com",
      auth: "test",
      createdAt: new Date()
    };

    jest.spyOn(UserModel, "findOne").mockResolvedValue(userMock as any);
    jest.spyOn(AuthHistory, "find").mockResolvedValue([{ ...authHistoryMock, _id: "123456" } as any]);

    const user = await authService.history(userMock.email);

    expect(user).toBeDefined();
  });
});