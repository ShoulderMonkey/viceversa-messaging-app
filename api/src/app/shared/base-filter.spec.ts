import { BASE_ENTITY_MOCKS, BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";

export class TestFilter extends BaseFilter<BaseEntity> { }

const testFilterArgs = {
    id: 'test-1',
    createdAtFrom: new Date('2024-01-01'),
    createdAtTo: new Date('2025-12-31'),
};
let filter: BaseFilter<BaseEntity> = new TestFilter(testFilterArgs);

describe('Base Filter', () => {
    describe('exactMatch Fn', () => {
        it('exact match to match', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(filter.exactMatch(entity, 'id', 'test-1')).toBe(true);
        })

        it('exact match to not match', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(filter.exactMatch(entity, 'id', 'wrong-id')).toBe(false);
        })

        it('exact match with invalid field', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(() => filter.exactMatch(entity, 'nonExistentField', 'value')).toThrow('Field nonExistentField does not exist on entity');
        })
    });

    describe('dateMatch Fn', () => {
        it('date match within range', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(filter.dateMatch(entity, 'createdAt', new Date('2024-01-01'), new Date('2026-01-01'))).toBe(true);
        })

        it('date match before range', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(filter.dateMatch(entity, 'createdAt', new Date('2025-02-01'), new Date('2026-01-01'))).toBe(false);
        })

        it('date match after range', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            expect(filter.dateMatch(entity, 'createdAt', new Date('2020-01-01'), new Date('2024-12-31'))).toBe(false);
        })
    });

    describe('matches Fn', () => {
        it('matches with all criteria met', () => {
            const entity = BASE_ENTITY_MOCKS[0]          
            expect(filter.matches(entity)).toBe(true);
        })

        it('does not match with id mismatch', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            const modifiedFilter = new TestFilter({ ...testFilterArgs, id: 'wrong-id' });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does not match with createdAt before from date', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            const modifiedFilter = new TestFilter({ ...testFilterArgs, createdAtFrom: new Date('2025-02-01') });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does not match with createdAt after to date', () => {
            const entity = BASE_ENTITY_MOCKS[0]
            const modifiedFilter = new TestFilter({ ...testFilterArgs, createdAtTo: new Date('2024-12-31') });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does match with CreatedAt in range', ()=> {
            const entity = BASE_ENTITY_MOCKS[0]
            const modifiedFilter = new TestFilter({ ...testFilterArgs, 
                createdAtFrom: new Date('2024-12-30'),
                createdAtTo: new Date('2025-01-02')
            });
            expect(modifiedFilter.matches(entity)).toBe(true);
        })
    });

})