import { Component } from '@angular/core';
import { DocumentListOptionModel } from "./models/document-list-option-model";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
    documents: DocumentListOptionModel[] = [
      {
        id: 1,
        title: 'First Document'
      },
      {
        id: 2,
        title: 'Second Document'
      },
      {
        id: 3,
        title: 'Third Document'
      }
    ]
}
