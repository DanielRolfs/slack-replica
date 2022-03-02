import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';





@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  get(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  async create() {
    const { uid } = await this.auth.getUser();
    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['chats', docRef.id]);
  }

  async sendMessage(chatId, content) {
    console.log('Sending message to chat ' + chatId + ': ' + content) ;
    const user  = await this.auth.getUser();
    console.log('User is', user);
    const data = {
      'uid': '',
      'chatId': chatId,
      'message': content,
      'createdAt': Date.now()
    };
    this.afs.collection('messages').add(data);
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

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        //Unique user Ids
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        //Firestore user doc raeds
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return chat;
      })
    )
  }
}
