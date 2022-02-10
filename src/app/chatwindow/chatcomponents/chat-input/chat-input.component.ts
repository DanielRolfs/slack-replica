import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {


somePlaceholder: string = 'new Value';
  constructor() { }

  ngOnInit(): void {
  }

}
