import { hashPassword, comparePassword } from "../../src/utils/password";

describe("Password Utils", () => {
  it("should hash a password", async () => {
    const password = "123456";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });

  it("should compare a password", async () => {
    const password = "123456";
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should not compare a password", async () => {
    const password = "123456";
    const wrongPassword = "1234567";
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword(wrongPassword, hashedPassword);
    expect(isMatch).toBe(false);
  });
})
