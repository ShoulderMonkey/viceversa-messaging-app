import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@viceversa-messaging-app/auth';

@Component({
  imports: [
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'web';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userHasLogged.subscribe((isLogged) => {
      if (isLogged)
        this.router.navigate(['/home'])
    })
  }
}
