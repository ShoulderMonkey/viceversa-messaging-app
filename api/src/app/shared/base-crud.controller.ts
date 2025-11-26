import { Body, Get, Post, Query } from "@nestjs/common";
import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { InMemoryRepository } from "./in-memory.repository";

type FilterConstructor<T extends BaseEntity, F extends BaseFilter<T>> = new (init?: Partial<F>) => F;

export abstract class BaseCRUDController<T extends BaseEntity, F extends BaseFilter<T>>{



    constructor(
        public readonly service: InMemoryRepository<T, F>,
        private readonly filterCtor: FilterConstructor<T, F>
    ) {

    }

    @Post()
    createOne(@Body() body:T){
        return this.service.createOne(body)
    }

    @Get('findMany')
    findMany(
        @Query() queryParams: F) {
        const filter = new this.filterCtor(queryParams);
        return this.service.findMany(filter);
    }

    @Get()
    getAll(){
        return this.service.getAll()
    }
}