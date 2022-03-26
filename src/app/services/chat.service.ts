import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
// import { Observable, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { chatMessages } from '../models/chat-message.model';





@Injectable({
  providedIn: 'root'
})
export class ChatService {

  message: Message = new Message();

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {
  }

  get(firestoreDocumentId): Observable<object> {
    return this.firestore
      .collection<any>('chats')
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

  async sendMessage(currentChatId: string, content: string) {

    console.log('Sending message to chat ' + currentChatId + ': ' + content);

    this.message.chatId = currentChatId;
    this.message.content = content;
    this.message.author = this.authService.currentUser.uid;
    this.message.createdAt = Date.now();

    // adding Message to "messages" collection
    this.firestore.collection('messages').add(this.message.toJson());

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

  /**
   * This function is called, when a new user is new signing up. Therefore we want to create for every single other user.
   * After the registration, there should be created a conversation each other user in the Application, so they can communicate via dm
   * This function creates a document in the "directMessages" collection, that represents the conversation between the dialog.
   * For every other user there is created a (new) document.
   */
  createNewDirectMessageConversations(uidOfNewUser: string) {
    this.firestore.collection('users').get().subscribe((querySnaphot) => {
      querySnaphot.forEach((doc: any) => {
        this.firestore.collection('directmessages').add({ users: [doc.data().uid, uidOfNewUser] })
      })
    })

  }
}
