import { encryptJWE, decryptJWE } from "../../src/utils/jwe";

describe("JWE utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.mock("jose");
  });

  it("should be able to encrypt and decrypt a message", async () => {
    const message = { email: "test@test.com", password: "password", currentDate: new Date() };
    const encrypted = await encryptJWE(message);
    expect(encrypted).toBeDefined();
    expect(encrypted).not.toBeNull();
    expect(encrypted).not.toBe("");
    expect(encrypted).not.toBeUndefined();
    expect(encrypted).not.toBeNaN();
    expect(encrypted).not.toBeNull();
    expect(encrypted).not.toBeUndefined();
    expect(encrypted).not.toBeNaN();
    expect(encrypted).not.toBeNull();
  });

  it("should be able to decrypt a message", async () => {
    const message = { email: "test@test.com", password: "password" };
    const encrypted = await encryptJWE(message);
    const decrypted = await decryptJWE(encrypted);
    expect(decrypted).toEqual(message);
  });

  it("should be able to encrypt and decrypt a message with a date", async () => {
    const message = { email: "test@test.com", password: "password", currentDate: new Date() };
    const encrypted = await encryptJWE(message);
    const decrypted = await decryptJWE(encrypted);
    expect(decrypted.email).toEqual(message.email);
    expect(decrypted.password).toEqual(message.password);
    expect(new Date(decrypted.currentDate)).toEqual(message.currentDate);
  });
  
});
