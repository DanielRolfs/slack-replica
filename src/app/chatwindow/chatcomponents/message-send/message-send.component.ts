import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';s
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
// import 'rxjs/add/operator/map';


@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.scss']
})
export class MessageSendComponent implements OnInit {
  channels$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    const channelsId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(channelsId);
    // this.chat$ = this.cs.joinUsers(source);
  }

  submit(channelsId) {
    this.cs.sendMessage(channelsId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
