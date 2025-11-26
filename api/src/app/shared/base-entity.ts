import { BadRequestException } from "@nestjs/common";

export abstract class BaseEntity {
  id?: string;
  createdAt?: Date;

  abstract validationFn?: (entity: BaseEntity) => boolean;

  baseValidationFn?: (entity: BaseEntity) => boolean = (entity: BaseEntity) => {
    if (!entity.id) {
      throw new BadRequestException('ID is required');
    }
    if (!entity.createdAt) {
      throw new BadRequestException('createdAt is required');
    }
    return true
  }
}

export const baseEntityMock = (): BaseEntity => ({
  id: 'test-1',
  createdAt: new Date('2025-01-01')
})

export const BASE_ENTITY_MOCKS: BaseEntity[] = [
  baseEntityMock(),
  {
    ...baseEntityMock(),
    id: 'test-2'
  }
]

export const BASE_ENTITY_MOCKS_FAULTY: BaseEntity[] = [
  {
    ...baseEntityMock(),
    id: undefined
  },
  {
    ...baseEntityMock(),
    createdAt: undefined
  }
]