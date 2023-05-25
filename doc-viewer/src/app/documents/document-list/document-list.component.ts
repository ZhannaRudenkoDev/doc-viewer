import { Component, OnInit } from '@angular/core';
import { DocumentListOptionModel } from "./models/document-list-option-model";
import { documentListData } from "./document-list-data";
import { ZoomService } from "../../shared/services/zoom/zoom.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
    documents: DocumentListOptionModel[] = documentListData;

    constructor(private zoomService: ZoomService) {
    }

    ngOnInit() {
      this.zoomService.setIsZoomDisplayed(false);
      this.zoomService.notifyDisplayZoomChangedClicked();
    }
}
