import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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

              // after signing up and updating the local-running current-signed-in-user-object by the displayName, we are adding the user and his info to the collection 
              this.firestore.collection('users').add(
                {
                  email: this.email,
                  displayName: this.displayName,
                  uid: user.uid,
                  photoUrl: this.photoUrl,
                }
              );

              if (!this.errorMessage) {
                this.router.navigateByUrl('');
              }
            })

        })
        .catch((error) => {
          this.errorMessage = error.message;
        });

    }


  }

  validateUserNameInput() {
    if (this.displayName.length < 3 || this.displayName.length == 0) {
      this.errorMessage = 'Please fill in user name';
      this.callFirebase = false;
    }
  }

  /**
   * This function is called, whenever the value of the input-field from the type "file" changes.
   * In other words, whenever the user chooeses and submits a file.
   * @param event - An event, where we can get the file from an input.
   */
  uploadFile(event): void {

    this.photoUrl = '';

    const file = event.target.files[0];

    if (file) {
      const filePath = 'images/' + file.name;
      const task = this.storage.upload(filePath, file);

      // after uploading a file to the storage, we would like to get the image-url of it & save it to our user-info, representing his profile-picture.
      task.task.snapshot.ref.getDownloadURL().then((imageUrl: string) => {
        console.log(imageUrl);
        this.photoUrl = imageUrl;
      })

      task.percentageChanges().subscribe((percentage: number) => {
        console.log((percentage) + '%');
      });
    }
  }
}