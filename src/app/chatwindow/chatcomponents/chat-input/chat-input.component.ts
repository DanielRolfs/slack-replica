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

  currentChatId: string;

  newMsg: string = '';

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.currentChatId = params['id'];
    })
    
  }

  submit() {
    this.chatService.sendMessage(this.currentChatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
