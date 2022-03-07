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
  channels$: Observable<any>;
  newMsg: string;

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    const channelsId = this.route.snapshot.paramMap.get('id');
    const source = this.chatService.get(channelsId);
    // this.chat$ = this.cs.joinUsers(source);
  }

  submit(channelsId) {
    this.chatService.sendMessage(channelsId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
