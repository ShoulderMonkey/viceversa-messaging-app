import { Body, Get, Post, Query } from "@nestjs/common";
import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { InMemoryRepository } from "./in-memory.repository";
import { PaginationOptions } from "./pagination.types";

type FilterConstructor<T extends BaseEntity, F extends BaseFilter<T>> = new (init?: Partial<F>) => F;

export abstract class BaseCRUDController<T extends BaseEntity, F extends BaseFilter<T>> {

    constructor(
        public readonly service: InMemoryRepository<T, F>,
        private readonly filterCtor: FilterConstructor<T, F>
    ) {

    }

    @Post()
    createOne(@Body() body: T) {
        return this.service.createOne(body)
    }

    @Get('findMany')
    findMany(
        @Query() queryParams: any /* F and PaginationOptions combined*/) {
        const { page, limit, ...filterParams } = queryParams;

        const filter = new this.filterCtor(filterParams as Partial<F>);
        const pagination = new PaginationOptions({ page, limit });

        console.log(filter);
        console.log(pagination);

        return this.service.findMany(filter, pagination);
    }

    @Get()
    getAll() {
        return this.service.getAll()
    }
}