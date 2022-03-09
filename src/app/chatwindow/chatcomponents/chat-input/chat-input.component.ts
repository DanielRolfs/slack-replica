import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {


  somePlaceholder: string = 'new Value';
  firestoreDocumentId: Observable<any>;
  newMsg: string;

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    const firestoreDocumentId = this.route.snapshot.paramMap.get('id');
    const source = this.chatService.get(firestoreDocumentId);
    // this.chat$ = this.cs.joinUsers(source);
  }

  submit(firestoreDocumentId) {
    this.chatService.sendMessage(firestoreDocumentId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
