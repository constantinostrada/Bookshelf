/**
 * IIdGenerator — port interface for unique ID generation.
 *
 * Defined in application so use cases can depend on it without knowing
 * whether it is a UUID, CUID, ULID, etc.
 */
export interface IIdGenerator {
  generate(): string;
}
