import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {


  somePlaceholder: string = 'new Value';
  firestoreDocumentId: string;
  newMsg: string = '';

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // this value stays static, care by calling submit/sendMessage. Changing routes, does not update the docId, sendMessage might sent to an old doc
    this.firestoreDocumentId = this.route.snapshot.paramMap.get('id');
    
    const source = this.chatService.get(this.firestoreDocumentId);
    // this.chat$ = this.cs.joinUsers(source);
  }

  submit() {
    this.chatService.sendMessage(this.firestoreDocumentId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
