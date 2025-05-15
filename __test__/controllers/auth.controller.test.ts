import { Request, Response } from "express";
import { history, login, register, verify } from '../../src/controllers/auth.controller';
import authService from "../../src/services/auth.service";
import { DataResponse } from "../../src/interfaces/data-response.interface";
import { ICreateUser } from "../../src/interfaces/user.interface";
import * as jwe from "../../src/utils/jwe";

describe("Auth Controller", () => {
  beforeEach(() => {

    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.mock("../../src/services/auth.service", () => ({
      register: jest.fn(),
      login: jest.fn(),
      verify: jest.fn(),
      history: jest.fn()
    }));
    jest.mock("../../src/utils/password");
    jest.mock("../../src/utils/jwe", () => ({
      decryptJWE: jest.fn(),
    }));
  });

  it("should be able to login a user", async () => {
    const req = { body: { email: "test@test.com", password: "password" } } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const userMock = { email: "test@test.com", password: "password" } as ICreateUser;
    
    jest.spyOn(authService, "login").mockResolvedValue(new DataResponse("User logged in successfully", { user: userMock }));
    
    await login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User logged in successfully", data: { user: userMock } });
  });

  it("should be able to register a user", async () => {
    const request = { body: { email: "test@test.com", password: "password", name: "Test User" } } as Request;
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const userMock: ICreateUser = { email: "test@test.com", password: "password", name: "Test User" };

    jest.spyOn(authService, "register").mockResolvedValue(new DataResponse("User registered successfully", { user: userMock }));
    
    await register(request, response);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ message: "User registered successfully", data: { user: userMock } });
  });

  it("should be able to verify a user", async () => {
    const req = { body: { auth: "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.U8cUu5VtZ52WrGCgcP06UHNF84HwioVRkc9tGU25n2DYSq12-ykwv8neiF2mv_ux5SeqfjAsEhWgAyXpbDXuKckBqihxPCR-iuKjVmvZlN7T3vM0sL5hWefWdmie5UB2aPZ28K12OJvG1ehrB_ur34XIKUl1H5iI7AkvZPbyjF2KKYOCLQ67jl6Nnn7Z-5578yPAzp4DFYmkDDbWgyvmvxs2R_M8CFBfq0BH2kp1OWs8O4GoMCQaxrBSWYqMtfajfgCmOdudo37CdZOWdWxMOtgAsK_z4oSJdNdtZ_GB5YNYNrMEcsgegw2UHwo4vpnWjLaCwZGB9qxI2M7a_y0FKg.bvKhTLk8bBPMp43_.09VhrtJ8hhn68p0tBOX53AXIKV3_lz8Bdp1-glZsQM3STtVCp2aT_v8oZBlTp-bezKhdF6U43pAURmnQ_ERvyp8NtKPS6hNLxoXDzooeU1X5GV3EpoJ0d4Of0Q94SkNOoCZan0ruBZonBtsqYGydUD1dL-kp-UwQne1UZHyb0HKsKhQzccVAXqUOhfZXbYFGiuggWLo2JC9e.vTggq8iMecO7dvAOnlOgLA" } } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const data = { email: "test@test.com", password: "password", currentDate: new Date() };

    jest.spyOn(jwe, "decryptJWE").mockResolvedValue(data);

    await verify(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Verification successful", data: { user: data } });
  });

  it("should be able to history a user", async () => {
    const req = { params: { email: "test@test.com" } } as unknown as Request<{ email: string }>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const historyMock = [{ email: "test@test.com", password: "password", currentDate: new Date() }];

    jest.spyOn(authService, "history").mockResolvedValue(new DataResponse("User history retrieved successfully", { history: historyMock }));
    
    await history(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User history retrieved successfully", data: { history: historyMock } });
  });
});
