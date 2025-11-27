import { Component } from '@angular/core';
import { AuthService } from '@viceversa-messaging-app/auth';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  usernameControl = new FormControl(null, Validators.required)

  constructor(
    private authService: AuthService
  ){}

  login(){
    const username = this.usernameControl.value
    this.authService.login({username}).subscribe()
  }
}
