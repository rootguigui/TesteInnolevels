import { Request, Response, NextFunction } from "express";
import errorHandler from "../../src/middlewares/custom-error";
import CustomError from "../../src/interfaces/custom-error.interface";

describe("Custom Error Middleware", () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    request = { body: {} } as Request;
    response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should be able to handle a custom error", () => {
    const error = new CustomError("Test error", 400, ["Test error"]);
    errorHandler(error, request as Request, response as Response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 400,
      message: "Test error",
      errors: ["Test error"],
    });
  });

  it("should be able to handle a default error", () => {
    const error = new Error("Test error");
    const customError = new CustomError(error.message, 500, []);
    errorHandler(customError, request as Request, response as Response, next);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: "Test error",
      errors: [],
    });
  });
  
});
