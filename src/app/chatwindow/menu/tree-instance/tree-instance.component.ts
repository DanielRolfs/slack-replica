import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-instance',
  templateUrl: './tree-instance.component.html',
  styleUrls: ['./tree-instance.component.scss']
})
export class TreeInstanceComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: any[] = []; // array from firebase collection


  isExpanded: boolean = false; // tree; ul of children tree-node(s)

  /** create-btn */
  @Input() createBtnisDisplayed: boolean = true;
  @Output() requestOpenDialog = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleTree() {
    this.isExpanded = !this.isExpanded;
  }

}
