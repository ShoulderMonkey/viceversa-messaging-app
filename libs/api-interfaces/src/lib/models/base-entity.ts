export interface BaseEntity {
  id?: string;
  createdAt?: Date;
  validationFn?: (entity: BaseEntity) => boolean;
  baseValidationFn?: (entity: BaseEntity) => boolean;
}
