import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@viceversa-messaging-app/api-interfaces';
import { BaseCRUDService } from "@viceversa-messaging-app/utils";
import { environment } from 'web/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseCRUDService<User>{
  endpointUrl = `${environment.apiUrl}/user`

  constructor(
    http: HttpClient
  ){
    super(http)
  }
}
