import { Component, HostListener, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import { DocumentImagesModel } from "../models/document-images.model";
import documentsData from './../documents.json';
import { DocumentViewModel } from "../models/document-view.model";
import { AnnotationMenuComponent } from "../annotation-menu/annotation-menu.component";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  documentFolder!: number;
  documentsImages!: DocumentImagesModel[];
  documents: DocumentViewModel[] = documentsData.documents;
  annotations: { type: Type<AnnotationMenuComponent>; x: number; y: number, index: number}[] = [];
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if(clickedElement.classList.contains('document-image-item')) {
      const coordinates = {
        x: event.pageX,
        y: event.pageY
      };
      this.addAnnotation(coordinates.x, coordinates.y, this.annotations.length + 1)
    }
  }

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

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
  }

  addAnnotation(x: number, y: number, index: number): void {
    this.annotations.push({ type: AnnotationMenuComponent, x, y, index});
  }

  deleteAnnotation(index: number) {
    this.annotations = this.annotations.filter(item => item.index !== index);
  }

}


