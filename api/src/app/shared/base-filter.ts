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
    /**
     * Used for partial matching of fields
     * @param entity entity to compare
     * @param field field to compare
     * @param searchKey string to search
     * @returns boolean indicating if the field matches the value
     */
    partialMatch(entity: T, field: keyof T, searchKey: string): boolean {
        const text = (entity[field] as string).toLowerCase()
        if (searchKey && text.includes(searchKey.toLowerCase())) {
            return true
        }

        return false
    }

    fullTextMatch(entity: T, field: keyof T, searchString: string): boolean {
        const searchKeys = searchString.split(' ')
        console.log(searchKeys);
        
        if(!searchKeys || searchKeys.length <= 0){
            console.log('return 1 false');
            
            return false;
        }
        for (const key of searchKeys) {
            if(!this.partialMatch(entity, field, key)){
                console.log('return 2 false');
                return false
            }
        }
        console.log('return 3 true');
        return true;
    }
}