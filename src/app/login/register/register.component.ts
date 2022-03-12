import { Component, OnInit } from '@angular/core';
import { getMaxListeners } from 'process';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  displayName: string;
  email: string;
  password: string;
  

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    
  }

  register() {
    this.authService.createUser(this.email, this.password); 
  }

}
