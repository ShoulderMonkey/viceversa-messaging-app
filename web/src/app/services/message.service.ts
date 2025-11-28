import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@viceversa-messaging-app/api-interfaces';
import { BaseCRUDService } from '@viceversa-messaging-app/utils';
import { environment } from 'web/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseCRUDService<Message>{
  endpointUrl = `${environment.apiUrl}/message`

  constructor(
    http: HttpClient
  ){
    super(http)
  }
}