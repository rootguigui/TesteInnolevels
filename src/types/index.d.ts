declare module 'jose' {
  export function generateSecret(algorithm: string, options?: { seed?: Uint8Array }): Promise<Uint8Array>;
  
  export class CompactEncrypt {
    constructor(payload: Uint8Array);
    setProtectedHeader(header: { alg: string; enc: string }): this;
    encrypt(key: Uint8Array): Promise<string>;
  }
  
  export function compactDecrypt(jwe: string, key: Uint8Array): Promise<{
    plaintext: Uint8Array;
  }>;

  export function importJWK(jwk: object, algorithm: string): Promise<Uint8Array>;

  export function generateKeyPair(algorithm: string, options?: {
    modulusLength?: number;
    seed?: Uint8Array;
  }): Promise<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
  }>;
} 