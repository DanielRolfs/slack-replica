import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
// import { Observable, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { chatMessages } from '../models/chat-message.model';





@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  get(firestoreDocumentId) {
    return this.firestore
      .collection<any>('channels')
      .doc(firestoreDocumentId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  // async create() {
  //   const { uid } = await this.auth.getUser();
  //   const data = {
  //     uid,
  //     createdAt: Date.now(),
  //     count: 0,
  //     messages: []
  //   };

  //   const docRef = await this.firestore.collection('channels').add(data);

  //   return this.router.navigate(['channels', docRef.id]);
  // }

  async sendMessage(name, content) {
    console.log('Sending message to chat ' + name + ': ' + content);
    // const users = await this.auth.getUser();
    // console.log('User is', users);
    const data = {
      // 'uid': '',
      'chatId': name,
      'message': content,
      'createdAt': Date.now()
    };
    this.firestore.collection('channels').doc(name).update({messages : content});


    // const data = {
    //   uid,
    //   content,
    //   createdAt: Date.now()
    // };

    // if (uid) {
    //   const ref = this.afs.collection('chats').doc(chatId);
    //   return ref.update({
    //     message: this.afs.FieldValue.arrayUnion(data)
    //   });

    // }
  }

  // joinUsers(chat$: Observable<any>) {
  //   let chat;
  //   const joinKeys = {};

  //   return chat$.pipe(
  //     switchMap(c => {
  //       //Unique user Ids
  //       chat = c;
  //       const uids = Array.from(new Set(c.messages.map(v => v.uid)));

  //       //Firestore user doc raeds
  //       const userDocs = uids.map(u =>
  //         this.afs.doc(`users/${u}`).valueChanges()
  //       );

  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).uid] = v));
  //       chat.messages = chat.messages.map(v => {
  //         return { ...v, user: joinKeys[v.uid] };
  //       });

  //       return chat;
  //     })
  //   )
  // }
}
