import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { PaginatedResult, PaginationOptions } from "./pagination.types";

export abstract class InMemoryRepository<T extends BaseEntity, F extends BaseFilter<T>> {

    items: T[] = [];

    createOne(item: T): T {
        const entity = {
            ...item,
            createdAt: new Date(),
            id: crypto.randomUUID(),
        }
        entity.validationFn(entity);
        this.items.push(entity);
        return entity;
    }

    findMany(filters: F, pagination: PaginationOptions = {}): PaginatedResult<T> {
        let results = this.items.filter(item => filters.matches(item));

        const { page = 1, limit = results.length } = pagination;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        results = results.slice(startIndex, endIndex);

        const total = results.length;
        const start = (page - 1) * limit;
        const data = results.slice(start, start + limit);

        return {
            data,
            total,
            page,
            limit,
        };
    }

    getAll(): T[] {
        return this.items;
    }
}