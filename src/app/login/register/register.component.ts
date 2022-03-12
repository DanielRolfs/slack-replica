import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { user } from 'rxfire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  displayName: string = '';
  email: string;
  password: string;
  photoUrl: string = '';

  user = new User;



  errorMessage: string;
  callFirebase: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.callFirebase = true;

    this.errorMessage = '';

    this.validateUserNameInput();

    if (this.callFirebase) {
      this.authService.createUser(this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          let user = userCredential.user;

          user.updateProfile({
            displayName: this.displayName,
          })
            .then(() => {
              console.log(user.displayName)
              console.log(user.uid);
              console.log('Creating User succssesfull', user.displayName);
              /* this.firestore.collection('users').add(
                {
                  email: this.email,
                  displayName: this.displayName,
                  uid: user.uid,
                  // photoUrl: this.photoUrl,
                }
              ); */
              // console.log(user.toJSON());


              if (!this.errorMessage) {
                this.router.navigateByUrl('');
              }
            })



        })
        .catch((error) => {
          this.errorMessage = error.message;
          // ...
        });

    }
   

  }

  validateUserNameInput() {
    if (this.displayName.length < 3 || this.displayName.length == 0) {
      this.errorMessage = 'Please fill in user name';
      this.callFirebase = false;
    }
  }

}
