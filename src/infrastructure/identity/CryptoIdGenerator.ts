/**
 * CryptoIdGenerator — generates RFC-4122 v4 UUIDs using the Web Crypto API.
 *
 * Available in Node 19+ and all modern browsers — no external library needed.
 * Implements the IIdGenerator port defined in application.
 */

import type { IIdGenerator } from "@/application/ports/IIdGenerator";

export class CryptoIdGenerator implements IIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
