import { Component, OnInit } from '@angular/core';
import { DialogAddChannelComponent } from 'src/app/dialog-windows/dialog-add-channel/dialog-add-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public authService : AuthService
  ) { }

  ngOnInit(): void {

  }

  openDialogCreateNewChannel() {
    console.log('Open Dialog! I want create a new channel.');
    const dialogRef = this.dialog.open(DialogAddChannelComponent);
    dialogRef.afterClosed().subscribe(name => {
      // ...
    });
  }

}
