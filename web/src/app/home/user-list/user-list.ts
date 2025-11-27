import { Component } from '@angular/core';
import { User } from '@viceversa-messaging-app/api-interfaces';
import { UserService } from '../../services/user.service';
import { map, Observable, tap } from 'rxjs';
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from '@viceversa-messaging-app/auth';
@Component({
  selector: 'app-user-list',
  imports: [
    MatIconModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  users: User[] = []
  $users?: Observable<User[]>
  constructor(
    private userService: UserService,
    private authService: AuthService
  ){
    this.getUsers()
  }

  
  getUsers(){
    this.$users = this.userService.getAll({limit: 100}).pipe(
      map((res: any) => res.data.filter((u: User) => u.id !== this.authService.getLoggedUser()?.id)),
      tap(users => this.users = users)
    )

    this.$users.subscribe()
  }

  messageUser(){
    
  }

}
