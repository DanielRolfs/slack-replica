import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-windows/dialog-add-channel/dialog-add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(private router: Router, public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
    this
      .firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channel) =>{
        console.log('Channel', channel);
      });
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;


  openDialogCreateNewChannel(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
