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

  displayName: string = '';
  email: string;
  password: string;

  errorMessage: string;
  callFirebase: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.callFirebase = true;
    this.validateUserNameInput();


    if (this.callFirebase) {
    this.authService.createUser(this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;

        user.updateProfile({
          displayName: this.displayName
        })
          .then(() => {
            console.log(user.displayName)
            console.log(user.uid);
            console.log('Creating User succssesfull', user.displayName)
            if (!this.errorMessage){
              this.router.navigateByUrl('');
              }
          })

      })
      .catch((error) => {
        this.errorMessage = error.message;
        // ...
      });
      
    }
    this.errorMessage = '';
  }

  validateUserNameInput(){
    if (this.displayName.length < 3 || this.displayName.length == 0) {
      this.errorMessage = 'Please fill in user name';
      this.callFirebase = false;
    }
  }
  

}
