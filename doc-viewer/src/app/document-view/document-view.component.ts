import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import { DocumentImagesModel } from "../models/document-images.model";
import documentsData from './../documents.json';
import { DocumentViewModel } from "../models/document-view.model";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  documentFolder!: number;
  documentsImages!: DocumentImagesModel[];
  documents: DocumentViewModel[] = documentsData.documents;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.documentFolder = params['id'] ? params['id'] : 0;
          this.documents.forEach(document => {
            if (document.id == this.documentFolder) {
              this.documentsImages = document.images;
            }
          })
        })
      )
      .subscribe();
  }

}


