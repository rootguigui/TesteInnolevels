import { CompactEncrypt, compactDecrypt, generateKeyPair } from 'jose';
import { TextEncoder, TextDecoder } from "util";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const secretKey = process.env.JWE_SECRET ?? "secret";

let keyPair: { publicKey: Uint8Array; privateKey: Uint8Array } | null = null;

const getFixedKey = async () => {
  if (keyPair) return keyPair;

  const encodedSecret = encoder.encode(secretKey);
  
  keyPair = await generateKeyPair('RSA-OAEP', {
    modulusLength: 2048,
    seed: encodedSecret.slice(0, 32)
  });
  
  return keyPair;
}

const getKey = async () => {
  const fixedKey = await getFixedKey();
  return fixedKey;
}

const encryptJWE = async (data: object) => {
  const payload = encoder.encode(JSON.stringify(data));
  const key = await getKey();

  const jwe = await new CompactEncrypt(payload)
    .setProtectedHeader({ alg: 'RSA-OAEP', enc: "A256GCM" })
    .encrypt(key.publicKey);

  return jwe;
}

const decryptJWE = async (jwe: string) => {
  const key = await getKey();
  const { plaintext } = await compactDecrypt(jwe, key.privateKey);
  const decoded = decoder.decode(plaintext);
  return JSON.parse(decoded);
}

export { getKey, encryptJWE, decryptJWE };


