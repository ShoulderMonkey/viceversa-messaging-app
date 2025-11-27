import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  
  usernameControl = new FormControl('', Validators.required)

  constructor(
    private userService: UserService
  ){}

  register(){
    const username = this.usernameControl.value!
    this.userService.createOne({username})
  }
}
