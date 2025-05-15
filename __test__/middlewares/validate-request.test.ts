import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../../src/middlewares/validate-request";

describe("Validate Request Middleware", () => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  
  let request: Partial<Request>;
  let response: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    request = { body: {} } as Request;
    response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should be able to validate a request", () => {
    request.body = { email: "test@test.com", password: "password" };

    const middleware = validateRequest(schema);
    middleware(request as Request, response as Response, next);

    expect(next).toHaveBeenCalled();
    expect(response.status).not.toHaveBeenCalled();
  });

  it("should be able to validate a request with errors", () => {
    request.body = { };

    const middleware = validateRequest(schema);
    middleware(request as Request, response as Response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Validation error',
        errors: expect.arrayContaining([
          expect.objectContaining({ fields: 'email', message: '"email" is required' }),
          expect.objectContaining({ fields: 'password', message: '"password" is required' })
        ])
      })
    );

    expect(next).toHaveBeenCalled();
  });
});
