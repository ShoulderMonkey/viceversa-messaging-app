import { Body, Get, Logger, Post, Query, UseGuards } from "@nestjs/common";
import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { InMemoryRepository } from "./in-memory.repository";

import { JWTGuard } from "../auth/strategies/jwt.strategy";
import { PaginationOptions } from "./pagination.types";

type FilterConstructor<T extends BaseEntity, F extends BaseFilter<T>> = new (init?: Partial<F>) => F;
@UseGuards(JWTGuard)
export abstract class BaseCRUDController<T extends BaseEntity, F extends BaseFilter<T>> {

    abstract logger: Logger

    constructor(
        public readonly service: InMemoryRepository<T, F>,
        private readonly filterCtor: FilterConstructor<T, F>
    ) {

    }

    @Post()
    createOne(@Body() body: T) {
        return this.service.createOne(body)
    }

    @Get('find-many')
    findMany(
        @Query() queryParams: any /* F and PaginationOptions combined*/) {
        const { page, limit, ...filterParams } = queryParams;

        const filter = new this.filterCtor(filterParams as Partial<F>);
        const pagination = new PaginationOptions({ page, limit });

        this.logger.debug(`FindMany params \n filter: ${JSON.stringify(filter)}\n pagination: ${JSON.stringify(pagination)}`)
        

        return this.service.findMany(filter, pagination);
    }

    @Get()
    getAll( @Query() queryParams: any) {
        const { page, limit} = queryParams
        const pagination = new PaginationOptions({ page, limit });
        return this.service.getAll(pagination)
    }
}