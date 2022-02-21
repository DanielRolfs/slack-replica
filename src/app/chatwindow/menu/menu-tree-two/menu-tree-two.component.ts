import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-windows/dialog-add-channel/dialog-add-channel.component';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Directmessages',
    children: [{ name: 'Niklas' }, { name: 'Daniel' }, { name: 'Mikail' }, { name: 'Mihai' }],
  },
];

@Component({
  selector: 'app-menu-tree-two',
  templateUrl: './menu-tree-two.component.html',
  styleUrls: ['./menu-tree-two.component.scss']
})
export class MenuTreeTwoComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;


  openDialogCreateNewChannel(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}