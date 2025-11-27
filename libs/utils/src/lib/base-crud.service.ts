import { HttpClient } from "@angular/common/http";
import { BaseHttpService } from "./base-http.service";

export interface PaginationParams{
    limit?: number,
    page?: number
}

export abstract class BaseCRUDService<T> extends BaseHttpService{
    
    abstract endpointUrl: string;

    constructor(
        http: HttpClient
    ){
        super(http)
    }

    getAll(){
        return this.get<T>(this.endpointUrl)
    }

    createOne(entity: T){
        return this.post<T>(`${this.endpointUrl}`,entity)
    }

    findMany(queryParams: any, paginationParams: PaginationParams){
        return this.get(`${this.endpointUrl}/find-many`, {params: {...queryParams,...paginationParams}})
    }
}