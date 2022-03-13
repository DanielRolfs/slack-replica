import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);

  email: string;
  password: string;

  hide = true;
  errorMessage: undefined;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.signIn(this.email, this.password)
      .catch((error) => {
        this.errorMessage = error.message;
      });;
  }

}
