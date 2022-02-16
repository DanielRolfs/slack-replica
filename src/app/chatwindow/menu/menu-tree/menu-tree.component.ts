import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Channels',
    children: [{ name: '#JavaScript' }, { name: '#TypeScript' }, { name: '#Angular' }, { name: '#Memes' }],
  },
  {
    name: 'Directmessages',
    children: [{ name: 'Niklas' }, { name: 'Daniel' }, { name: 'Mikail' }, { name: 'Mihai' }],
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

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

}
