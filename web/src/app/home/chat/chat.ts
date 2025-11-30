import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from '@angular/router';
import { Message, User } from '@viceversa-messaging-app/api-interfaces';
import { AuthService } from '@viceversa-messaging-app/auth';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule,
    CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {

  inputControl = new FormControl('', Validators.required)

  messages: Message[] = []
  recipientUser?: User
  $messages?: Observable<Message[]>  
  $recipientUser?: Observable<User>

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
  ){
    combineLatest([this.getRecipientUser(),this.getMessages()]).pipe(
      tap(([recipientUser, messages]) => this.messages = messages.sort((a,b) => {
        const aDate = new Date(a.createdAt!)
        const bDate = new Date(b.createdAt!)
        return aDate.getTime() - bDate.getTime()
      }))
    ).subscribe()
    
    
  }

  private getRecipientUser(){
    const $recipientUser = this.route.data.pipe(
      map(data => data['user']),
      tap(recipientUser => this.recipientUser = recipientUser)
    )
    return $recipientUser
  }

  private getMessages(): Observable<Message[]>{
    const $messages = this.route.data.pipe(
      map(data => data['messages']),
      tap(messages => console.log(messages))
    )
    return $messages
  }

  isMessageReceived(message: Message):boolean{
    const res = message.senderId === this.recipientUser?.id
    console.log('message', message.id, 'isReceived', res);
    
    return res
  }

  sendMessage(){
    const body = this.inputControl.value!
    const message: Message = {
      recipientId: this.recipientUser?.id,
      senderId: this.authService.getLoggedUser()?.id,
      body: body
    }

    this.messageService.createOne(message).pipe(
      tap(()=> this.messages.push(message))
    ).subscribe()
  }
}
