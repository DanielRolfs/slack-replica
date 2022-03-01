import { Component, OnInit } from '@angular/core';
import { DialogAddChannelComponent } from 'src/app/dialog-windows/dialog-add-channel/dialog-add-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allChannels: object[] = []; // channels from firebase collection. Group Chat.
  allUsers: any[] = ['Mihai', 'Niklas', 'Daniel']; // array from firebase collection. It's representing the "direct messages", that you are able to write/communicate with people.

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channels: any[]) => {
        console.log('Menu-Component is loading: ', channels);
        this.allChannels = channels;
      });

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((users: any[]) => {
        console.log('Menu-Component is loading: ', users);
        this.allUsers = users;
      });
  }

  openDialogCreateNewChannel() {
    console.log('Open Dialog! I want create a new channel.');
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
    dialogRef.afterClosed().subscribe(name => {
      // ...
    });
  }

}
