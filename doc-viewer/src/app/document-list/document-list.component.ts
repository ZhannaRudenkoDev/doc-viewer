import { Component } from '@angular/core';
import { DocumentListOptionModel } from "./models/document-list-option-model";
import { documentListData } from "./document-list-data";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
    documents: DocumentListOptionModel[] = documentListData;
}
