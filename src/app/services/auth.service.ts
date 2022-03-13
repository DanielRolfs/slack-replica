import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { CostumUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser: null | User;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Listening to signedIn/signedOut User
    this.auth.authState.subscribe((user) => {
      // saving the streamed value, in our project; to be more precise globally in the authService.
      this.currentUser = user;
      if (user) {
        console.log('User signedIn!', user.uid);
        this.router.navigate(['chatwindow/0']);
      } else {
        console.log('User signedOut!');
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

  // getUser() {
  //   return this.user$.pipe(first()).toPromise();
  // }

  // googleSignIn() {
  //   const provider = new GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  // private async oAuthLogin(provider: firebase.auth.AuthProvider) {
  //   const credential = await this.afAuth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  // private updateUserData({ uid, email, name, photoURL, password }) {
  //   const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`user/${uid}`);
  //   const data = {
  //     uid,
  //     email,
  //     name,
  //     photoURL,
  //     password
  //   };

  //   return userRef.set(data, { merge: true });
  // }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['']);
    })
  }

}
