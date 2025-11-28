import { Test, TestingModule } from "@nestjs/testing";
import { BaseEntity } from "./base-entity";
import { BaseFilter } from "./base-filter";
import { InMemoryRepository } from "./in-memory.repository";
import { Logger } from "@nestjs/common";
import { PaginationOptions } from "./pagination.types";



export abstract class BaseInMemoryRepositoryTest<Entity extends BaseEntity, Filter extends BaseFilter<Entity>> {

    /**
     * Get the service class to be tested
     */
    abstract getService(): new (...args: any[]) => InMemoryRepository<Entity, Filter>;
    /**
     * Get the entity class associated with the service
     */
    abstract getEntity(): new () => Entity;
    /**
     * Get multiple mock instances of the entity.
     */
    abstract getEntitiesMock(): Entity[];
    /**
     * Get multiple faulty mock instances of the entity for negative testing.
     */
    abstract getEntitiesMockFaulty(): Entity[];
    moduleImports?: any[] = [];
    moduleProviders?: any[] = [];

    moduleRef: TestingModule;
    service: InMemoryRepository<Entity, Filter>;

    async beforeAll() {
        this.moduleRef = await Test.createTestingModule({
            imports: [
                ...this.moduleImports,
            ],
            providers: [
                {
                    provide: InMemoryRepository,
                    useClass: this.getService(),
                },
                ...this.moduleProviders
            ],
        })
            .setLogger(new Logger())
            .compile();

        this.service = this.moduleRef.get<InMemoryRepository<Entity, Filter>>(InMemoryRepository);
    }

    async beforeEach() {
        jest.clearAllMocks();
    }

    abstract otherTests(): void;

    testValidation(): void {
        describe('Base functionalities tests', () => {
            it('should validate correct entities', () => {
                const entities = this.getEntitiesMock();

                for (const entity of entities) {
                    // Use `as any` to bypass a complex TypeScript type inference issue with jest.spyOn and generics
                    const validationSpy = jest.spyOn(entity as any, 'validationFn');

                    expect(this.service.createOne(entity)).toBeDefined()
                    expect(validationSpy).toHaveBeenCalled();
                    //expect(this.service.createOne).rejects.toBeUndefined()
                    validationSpy.mockRestore();
                }
            });

            it('should throw an error on faulty entities', async () => {
                const entities = this.getEntitiesMockFaulty();

                for (const entity of entities) {
                    // Use `as any` to bypass a complex TypeScript type inference issue with jest.spyOn and generics
                    //const validationSpy = jest.spyOn(entity as any, 'validationFn');

                    await expect(()=> this.service.createOne(entity)).toThrow();
                    //expect(validationSpy).toHaveBeenCalled();
                    //expect(this.mockRepository.save).not.toHaveBeenCalled();
                    //validationSpy.mockRestore();
                }
            });

            it('should retrieve all created entities', () => {
                this.service.items = this.getEntitiesMock()
                const pagination = new PaginationOptions({limit:100})
                const allEntities = this.service.getAll(pagination);

                expect(allEntities.data.length).toBe(this.getEntitiesMock().length)
            });
        });

        describe('Find many functionalities', () => {
            it('should handle filters correctly', () => {
            })
        })
    }


    runTests() {
        describe(`${this.getEntity().name} Service Unit Tests`, () => {
            beforeAll(async () => await this.beforeAll());
            beforeEach(async () => await this.beforeEach());

            this.testValidation();
            this.otherTests();
        });
    }
}

function sanitizeForComparison<T extends Record<string, any>>(
    original: T
): Partial<T> {
    const clone = { ...original };

    // remove fields that are expected to be transformed/overwritten 
    delete clone.id; // optional, since DB might generate it

    return clone;
}