import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.scss']
})
export class ChatwindowComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
  }

}
