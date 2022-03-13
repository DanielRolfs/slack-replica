import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import firebase from 'firebase/compat/app';
import { first, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/compat';
import { getMaxListeners } from 'process';
import { UserCredential } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // this.user$ = this.auth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.firestore.doc<any>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );

    // Listening to auth-state
    this.auth.authState.subscribe((user) => { // wie lange hält eine signIn
      if (user) {
        this.currentUser = user;
      } else {
        // user signedOut
        // ...
      }
    });
  }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
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

  // async signOut() {
  //   await this.afAuth.signOut();
  //   return this.router.navigate(['/']);
  // }
}
