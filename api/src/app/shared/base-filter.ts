import { BadRequestException } from "@nestjs/common";
import { BaseEntity } from "./base-entity";

/**
 * Instantiate a filter object with criteria to filter entities of type T 
 */

export abstract class BaseFilter<T extends BaseEntity> {
    id?: string;
    createdAtFrom?: Date;
    createdAtTo?: Date;

    constructor(
        init?: Partial<BaseFilter<T> & Record<string, any>>
    ) {
        Object.assign(this, init);
    }

    /**
     * Determines if an entity matches the filter criteria
     * @param entity entity to check
     * @returns boolean indicating if the entity matches the filter
     * 
     * To be implemented by subclasses for additional filtering logic
     */
    matches(entity: T): boolean {
        if (this.id && !this.exactMatch(entity, 'id', this.id)) {
            return false;
        }
        if (!this.dateMatch(entity, 'createdAt', this.createdAtFrom, this.createdAtTo)) {
            return false;
        }
        return true;
    }


    /**
     * Used for exact matching of fields
     * @param entity entity to compare
     * @param field field to compare
     * @param value value to match
     * @returns boolean indicating if the field matches the value
     */
    exactMatch(entity: T, field: any/* keyof BaseFilter<T> */, value: any): boolean {
        if (entity[field] === undefined) {
            throw new BadRequestException(`Field ${field} does not exist on entity`);
        }       
        return entity[field] === value;
    }

    /**
     * Used to match date ranges
     * @param entity entity to compare
     * @param field field to compare
     * @param from start date
     * @param to end date
     * @returns boolean indicating if the field matches the value
     */
    dateMatch(entity: T, field: keyof T, from?: Date, to?: Date): boolean {
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;
        if (fromDate && (entity[field] as Date) < fromDate) {            
            return false;
        }
        if (toDate && entity[field] > toDate) {
            return false;
        }
        return true;
    }
}