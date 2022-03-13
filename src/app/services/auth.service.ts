import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { DocumentSnapshot } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { CostumUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser: User | null = null; // default: null

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Listening to signedIn/signedOut User
    this.auth.authState.subscribe((user: User) => {

      let userFirestoreDocumentId: string = this.currentUser ? this.currentUser.uid : ''; // declaring and saving a variable called "userFirestoreDocumentId" before the value "currentUser" is initialized by the value forexample null, if we dont we cant get any information of null anymore, so the acces to his document in Firestore

      this.setCurrentUser(user); // saving the streamed value, in our project; to be more precise globally in the authService.

      if (user) {
        console.log('User signedIn!', user.uid);
        this.router.navigate(['chatwindow/0']);
        this.isOnline(user.uid);
      } else {
        console.log('User signedOut!');
        this.isOffline(userFirestoreDocumentId);
      }

    });
  }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * This function is called in the Register-Component, to be more precise in the signUp()-function.
   * After the user has put his user-information and signed-up:
   * We add the user to our firebase/firestore "users" collection.
   * By setting the document-id manual with the user.uid and data, that is converted to our costum-made class/object "CostumUser"
   * @param {User} user - An user-object defined in firebase/auth, that is converted
   * @returns {Promise<void>} 
   */
  addUserToFirestoreCollection(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument = this.firestore.collection('users').doc(user.uid);

    let costumUserObject = new CostumUser(
      user.uid,
      user.email,
      this.currentUser !== null,
      user.photoURL,
      user.displayName,
      user.emailVerified
    );

    return userRef.set(costumUserObject.toJSON(), {
      merge: true
    })

  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Sets & Updates the user-status, by updating the property within the user-doc
   * @param firestoreDocumentId - The document-id of the user-document in the firestore collection "users" => to get access
   */
  isOnline(firestoreDocumentId: string): void {
    this.getDocumentByIdInFirestore(firestoreDocumentId)
      .subscribe((doc) => {
        const isAlreadyRegistered = doc.exists;
        if (isAlreadyRegistered) {
          this.firestore
            .collection('users')
            .doc(firestoreDocumentId)
            .update({ 'status': true })
            .then(() => {
              console.log('User Status was updated! The user is online');
            })
        } else {
          console.log('This is a Message from the "auth.service.ts": The user is registering new for the 1st time! Dont execute this logic and the funtion isOnline().');
        }
      })
  }

  getDocumentByIdInFirestore(firestoreDocumentId) {
    return this.firestore
      .collection('users')
      .doc(firestoreDocumentId)
      .get()
  }

  /**
   * Sets & Updates the user-status, by updating the property within the user-doc
   * By dafault and first-loading page there is no user of course => prevent by Fallback and condition
   * @param firestoreDocumentId - The document-id of the user-document in the firestore collection "users" => to get access
   */
  isOffline(firestoreDocumentId: string): void {
    if (firestoreDocumentId != '') {
      this.firestore
        .collection('users')
        .doc(firestoreDocumentId)
        .update({ 'status': false })
        .then(() => {
          console.log('User Status was updated! The user is offline');
        })
    } else {
      console.log('This is a Message from the "auth.service.ts": The website is loading for the 1st time! Dont execute this logic and the funtion isOffline().');
    }
  }

  // googleSignIn() {
  //   const provider = new GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  // private async oAuthLogin(provider: firebase.auth.AuthProvider) {
  //   const credential = await this.afAuth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['']);
    })
  }

  setCurrentUser(value: User | null): void {
    this.currentUser = value;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

}
