import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, takeUntil, tap } from "rxjs";
import { DocumentImagesModel } from "../models/document-images.model";
import documentsData from './../documents.json';
import { AnnotationMenuComponent } from "../annotation-menu/annotation-menu.component";
import { AnnotationsModel } from "../models/annotations.model";
import { NotificationService } from "../services/notification.service";
import { ZoomService } from "../services/zoom.service";
import { DocumentAnnotationModel } from "../models/document-annotation.model";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  documentFolder!: number;
  documentsImages!: DocumentImagesModel[];
  documents = documentsData.documents;
  buttonClicked!: boolean;
  annotations: DocumentAnnotationModel[] = [];
  annotationsPayload: DocumentAnnotationModel[] = [];
  result: AnnotationsModel[] = [];
  scaleValue = '';
  private destroy$ = new Subject();
  private subscription!: Subscription;
  private subscriptionZoom!: Subscription;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if(clickedElement.classList.contains('document-image-item')) {
      const coordinates = {
        x: event.pageX,
        y: event.pageY
      };
      this.addAnnotation(coordinates.x, coordinates.y, this.annotations.length + 1);
    }
  }

  constructor(private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoomService: ZoomService) {}

  ngOnInit() {
    this.scaleValue = '1';
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
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

    this.subscription = this.notificationService.saveClicked$.subscribe(() => {
      this.buttonClicked = true;
      this.createResult();
      console.log(JSON.stringify(this.result));
    });

    this.subscriptionZoom = this.zoomService.zoomChanged.subscribe(() => {
      this.scaleValue = this.zoomService.getZoomLavel() === 100 ? '1' : '0.' + this.zoomService.getZoomLavel();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
    this.subscription.unsubscribe();
    this.subscriptionZoom.unsubscribe();
    this.destroy$.complete();
  }

  addAnnotation(x: number, y: number, index: number): void {
    this.annotations.push({ type: AnnotationMenuComponent, x, y, index});
    this.annotationsPayload = [ ...this.annotations];
  }

  deleteAnnotation(index: number) {
    this.annotations = this.annotations.filter(item => item.index !== index);
    this.annotationsPayload = [ ...this.annotations];
  }

  setAnnotationValue(event: {type: string; content: string}, index: number) {
    this.annotationsPayload = this.annotations.map(item => {
      if(item.index === index) {
        return {
          ...item,
          typeData: event.type,
          content: event.content
        }
      } else {
        return item;
      }
    });
  }

  createResult() {
    this.result = this.annotationsPayload.map(item => {
      return {
        page: item.index,
        type: item.typeData ?? 'text',
        content: item.content ?? '',
        coords: {
          x: item.x,
          y: item.y
        }
      }
    })
  }
}


