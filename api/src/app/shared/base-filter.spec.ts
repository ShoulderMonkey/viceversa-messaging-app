import { BASE_ENTITY_MOCKS, BaseEntity, baseEntityMock } from "./base-entity";
import { BaseFilter } from "./base-filter";

export class TestFilter extends BaseFilter<BaseEntity> { }

//needed in testing matches fn
const testFilterArgs = {
    id: 'test-1',
    createdAtFrom: new Date('2024-01-01'),
    createdAtTo: new Date('2025-12-31'),
};
let filter: BaseFilter<BaseEntity> = new TestFilter(testFilterArgs);

describe('Base Filter', () => {
    describe('exactMatch Fn', () => {
        it('exact match to match', () => {
            const entity = baseEntityMock()
            expect(filter.exactMatch(entity, 'id', 'test-1')).toBe(true);
        })

        it('exact match to not match', () => {
            const entity = baseEntityMock()
            expect(filter.exactMatch(entity, 'id', 'wrong-id')).toBe(false);
        })

        it('exact match with invalid field', () => {
            const entity = baseEntityMock()
            expect(() => filter.exactMatch(entity, 'nonExistentField', 'value')).toThrow('Field nonExistentField does not exist on entity');
        })
    });

    describe('dateMatch Fn', () => {
        it('date match within range', () => {
            const entity = baseEntityMock()
            expect(filter.dateMatch(entity, 'createdAt', new Date('2024-01-01'), new Date('2026-01-01'))).toBe(true);
        })

        it('date match before range', () => {
            const entity = baseEntityMock()
            expect(filter.dateMatch(entity, 'createdAt', new Date('2025-02-01'), new Date('2026-01-01'))).toBe(false);
        })

        it('date match after range', () => {
            const entity = baseEntityMock()
            expect(filter.dateMatch(entity, 'createdAt', new Date('2020-01-01'), new Date('2024-12-31'))).toBe(false);
        })
    });

    describe('partialMatch fn', () => {
        it('should match with substring', () => {
            const entity = baseEntityMock()
            expect(filter.partialMatch(entity, 'id', 'test')).toBe(true)
        })

        it('should match with uppercase substring', ()=> {
            const entity = baseEntityMock()
            expect(filter.partialMatch(entity, 'id', 'TEST')).toBe(true)
        })

        it('should not match with different string', () => {
            const entity = baseEntityMock()
            expect(filter.partialMatch(entity, 'id', 'not-matching-value')).toBe(false)
        })

        it('should not match with null or undefined', ()=> {
            const entity = baseEntityMock()
            expect(filter.partialMatch(entity, 'id', null)).toBe(false)
            expect(filter.partialMatch(entity, 'id', undefined)).toBe(false)
        })
    })

    describe('fullTextMatch fn', () => {
        it('should match', ()=> {
            const entity = {//forced to use id as other properties doesn't exist in BaseEntity
                id: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
            }
            expect(filter.fullTextMatch(entity, 'id','Lorem')).toBe(true)
            expect(filter.fullTextMatch(entity, 'id','Lorem Ipsum')).toBe(true)
            expect(filter.fullTextMatch(entity, 'id','Ipsum Lorem')).toBe(true)
            expect(filter.fullTextMatch(entity, 'id','lorem')).toBe(true)
            expect(filter.fullTextMatch(entity, 'id','lorem dummy')).toBe(true)
        })
    })

    describe('matches Fn', () => {
        it('matches with all criteria met', () => {
            const entity = baseEntityMock()
            expect(filter.matches(entity)).toBe(true);
        })

        it('does not match with id mismatch', () => {
            const entity = baseEntityMock()
            const modifiedFilter = new TestFilter({ ...testFilterArgs, id: 'wrong-id' });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does not match with createdAt before from date', () => {
            const entity = baseEntityMock()
            const modifiedFilter = new TestFilter({ ...testFilterArgs, createdAtFrom: new Date('2025-02-01') });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does not match with createdAt after to date', () => {
            const entity = baseEntityMock()
            const modifiedFilter = new TestFilter({ ...testFilterArgs, createdAtTo: new Date('2024-12-31') });
            expect(modifiedFilter.matches(entity)).toBe(false);
        })

        it('does match with CreatedAt in range', () => {
            const entity = baseEntityMock()
            const modifiedFilter = new TestFilter({
                ...testFilterArgs,
                createdAtFrom: new Date('2024-12-30'),
                createdAtTo: new Date('2025-01-02')
            });
            expect(modifiedFilter.matches(entity)).toBe(true);
        })
    });

})