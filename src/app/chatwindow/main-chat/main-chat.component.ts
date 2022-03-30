import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult, Reference } from '@angular/fire/compat/storage/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {

  messages: any[];

  currentChatId: string;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.currentChatId = params['id'];

      // detecting, whether clicked chat-document in the firestore-collection "chats" is a public group chat or a private direct message
      this.firestore.collection('chats').doc(this.currentChatId).get()
        .subscribe((docSnap) => {

          const chatType = docSnap.get('type'); // 'channels' || undefined; eigentlich könnte man auch nur if(docSnap.exists) machen, weil durch du doc-id Zugriff auf chats collection versucht wird, aber dann wäre die Logik indirekt zu entschlüsseln

          if (chatType == 'channels') {
            // Get messages of a group chat
            this.firestore.collection('messages', ref => ref.where('chatId', '==', this.currentChatId).orderBy('createdAt', 'asc'))
              .valueChanges({ idField: 'uuidMessage' })
              .subscribe((queriedMessages: any) => {
                this.messages = queriedMessages;
              });
          } else {
            // Get messages of a private chat
            this.firestore.collection('messages', ref => ref.where('chatId', 'in', [this.currentChatId, this.authService.currentUser.uid]).orderBy('createdAt', 'asc'))
              .valueChanges({ idField: 'uuidMessage' })
              .subscribe((queriedMessages: any) => {
                this.messages = queriedMessages.filter(message => message.author == this.authService.currentUser.uid || message.author == this.currentChatId);
              });
          }
        })
    })

  }
}
