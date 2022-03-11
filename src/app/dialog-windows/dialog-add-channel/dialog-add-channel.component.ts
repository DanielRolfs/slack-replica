import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/models/chat.class';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {

  name: string = '';

  channel = new Chat();

  constructor(
    private firestore: AngularFirestore,
    private dialogRef: MatDialogRef<DialogAddChannelComponent>,
    public chatService: ChatService,) { }

  ngOnInit(): void {
  }
  // create() {
  //   console.log('Created Channel is', this.channel);
  //   console.log('Adding channel finished');

  //   setTimeout(() => {
  //     this.closeDialog();
  //   })

  // }
  createChannel() {

    console.log('Created Channel is', this.channel)

    this.channel.type = 'channels';
    
    this.firestore
      .collection('chats')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log('Adding channel finished', result);
      });
    setTimeout(() => {
      this.closeDialog();
    }, 1000);

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
