import { Component } from '@angular/core';
import { AuthService } from '@viceversa-messaging-app/auth';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule],
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
