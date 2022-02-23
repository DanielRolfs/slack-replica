import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-windows/dialog-add-channel/dialog-add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/models/channel.class';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Channels',
    children: [{ name: '#JavaScript' }, { name: '#TypeScript' }, { name: '#Angular' }, { name: '#Memes' }],
  },
];

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent implements OnInit {
  channel = new Channel();
  allChannel :any = [];


  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource: any; 

  constructor(private router: Router, public dialog: MatDialog, private firestore: AngularFirestore) {   }

  ngOnInit(): void {
   
    this
      .firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channel: any) =>{
        console.log('Channel', channel);
        this.dataSource = new MatTreeNestedDataSource<TreeNode>();
        TREE_DATA[0].children = channel;
        this.dataSource.data = TREE_DATA;
        console.log(this.dataSource.data);

      });
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;


  openDialogCreateNewChannel(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);

    dialogRef.afterClosed().subscribe(name => {
      
    });

  }

}
