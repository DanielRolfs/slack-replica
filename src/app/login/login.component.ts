import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  constructor() { }

  ngOnInit(): void {


  }

  login() {
    
  }


  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter an email';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
