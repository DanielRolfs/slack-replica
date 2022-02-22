import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel.class';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  name: string = '';

  channel = new Channel();

  constructor() { }

  ngOnInit(): void {
  }

  createChannel(){
    console.log('Created Channel is', this.channel)
  }

}
