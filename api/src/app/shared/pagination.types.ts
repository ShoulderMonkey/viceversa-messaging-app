export class PaginationOptions {
  page?: number;
  limit?: number;

  constructor(init?: Partial<PaginationOptions>){
    this.page = init?.page ? Number(init.page) : 1;
    this.limit = init?.limit ? Number(init.limit) : 10;
  }
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}