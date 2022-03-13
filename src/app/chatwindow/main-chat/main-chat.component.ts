import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult, Reference } from '@angular/fire/compat/storage/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {

  messages: Observable<any[]>;

  currentChatId: string;

  imagesChache: object[] = [
    { 'uuiUiser': 'downloadUrl' },
    { 'hvlIJoNAl8ccwcgo07gaT96Kw4k2': 'https://firebasestorage.googleapis.com/v0/b/slack-replica.appspot.com/o/images%2Fballoon-5307204_1920.jpg?alt=media&token=e644d22c-ceba-4842-90de-a1e2410dc05a' }
  ];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.currentChatId = params['id'];
      this.messages = this.firestore.collection('messages', ref => ref.where('chatId', '==', this.currentChatId)).valueChanges({ idField: 'uuidMessage' });
    })

    // this code-block is responsible for console-logging out all image-url's (src-url), that are stored in the Firebase/Storage.
    this.storage.ref('images').listAll().subscribe((listResult: ListResult) => {
      const items: Reference[] = listResult.items;
      items.forEach((itemRef: Reference) => {
        itemRef.getDownloadURL().then((sourceUrl: string) => {
          console.log(sourceUrl);
        })
      })
    })
  }
}
