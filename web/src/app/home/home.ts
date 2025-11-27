import { Component } from '@angular/core';
import { UserList } from "./user-list/user-list";

@Component({
  selector: 'app-home',
  imports: [UserList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
