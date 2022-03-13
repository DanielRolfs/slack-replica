import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-tree-instance',
  templateUrl: './tree-instance.component.html',
  styleUrls: ['./tree-instance.component.scss']
})
export class TreeInstanceComponent implements OnInit {

  @Input() title: string = '';

  database: any[];
  @Input() firestoreCollectionName: string;

  isExpanded: boolean = false; // tree; ul of children tree-node(s)

  /** create-channel-btn */
  @Input() createBtnisDisplayed: boolean = true;
  @Output() requestOpenDialog = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getCollection(this.firestoreCollectionName).subscribe((output: object[]) => {
      this.database = output;
    });

  }

  toggleTree() {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * The object within the database is added by a new property, called "firestoreDocumentId".
   * This method is called it the ngOnInit() function.
   * And should be subscribed. 
   * At any changes, it updates the localArray by its data.
   * @param collectionName - The name of the collection in the Firestore
   * @returns {Observable <object[]>} - The collection we want
   */
  getCollection(collectionName: string): Observable<object[]> {
    return this.firestore
      .collection(collectionName)
      .valueChanges({ idField: 'firestoreDocumentId' });
  }

}

