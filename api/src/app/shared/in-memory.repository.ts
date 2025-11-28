import { NotFoundException } from "@nestjs/common";
import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { PaginatedResult, PaginationOptions } from "./pagination.types";

type EntityConstructor<T extends BaseEntity> = new (init?: Partial<T>) => T;
export abstract class InMemoryRepository<T extends BaseEntity, F extends BaseFilter<T>> {

    constructor(
        private readonly entityCtor: EntityConstructor<T>
    ){}

    items: T[] = [];

    createOne(item: T): T {
        const entity = {
            ...new this.entityCtor(),
            ...item,
            createdAt: new Date(),
            id: item.id?item.id:crypto.randomUUID(),
        }
        entity.validationFn(entity);
        this.items.push(entity);
        return entity;
    }

    findMany(filters?: F, pagination: PaginationOptions = new PaginationOptions()): PaginatedResult<T> {
        let results = this.items.filter(item => filters.matches(item));
        const { page, limit} = pagination;
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

    getAll(pagination: PaginationOptions = {}): PaginatedResult<T> {
        let results = this.items 

        const { page, limit} = pagination;
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

    findById(id: string){
        const result = this.items.find((i) => i.id === id)
        if(!result)
            throw new NotFoundException()
        return result 
    }
}