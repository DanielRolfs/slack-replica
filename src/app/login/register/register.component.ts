import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CostumUser } from 'src/app/models/user.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  user = new CostumUser();

  displayName: string = '';
  photoURL: string = '';

  // validation
  errorMessage: string;
  callFirebase: boolean = true;

  constructor(
    public authService: AuthService,
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
            photoURL: this.photoURL,
          })
            .then(() => {
              this.authService.addUserToFirestoreCollection(user).then(() => {
                console.log('Registrierung erfolgreich! Benutzerkonto und Dokument im Firestore in der Sammlung "users" wurden erstellt.');
              });
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

    // this.photoUrl = '';

    const file = event.target.files[0];

    if (file) {
      const filePath = 'images/' + file.name;
      const task = this.storage.upload(filePath, file);

      // after uploading a file to the storage, we would like to get the image-url of it & save it to our user-info, representing his profile-picture.
      task.task.snapshot.ref.getDownloadURL().then((imageUrl: string) => {
        console.log(imageUrl);
        this.photoURL = imageUrl;
        console.log(this.photoURL);

      })

      task.percentageChanges().subscribe((percentage: number) => {
        console.log((percentage) + '%');
      });
    }
  }
}