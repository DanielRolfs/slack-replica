import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {


somePlaceholder: string = 'new Value';
  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

}
