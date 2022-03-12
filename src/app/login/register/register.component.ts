import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { user } from 'rxfire/auth';
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

  errorMessage: undefined;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.authService.createUser(this.email, this.password)

      .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;

        this.router.navigateByUrl('');

        user.updateProfile({
          displayName: this.displayName
        })
          .then(() => {
            console.log(user.displayName)
            console.log(user.uid);

            console.log('Creating User succssesfull', user.displayName)
          })

      })
      .catch((error) => {
        this.errorMessage = error.message;
        // ...
      });
  }

}
