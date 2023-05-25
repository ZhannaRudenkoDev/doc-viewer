import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription, takeUntil, tap } from "rxjs";
import documentsData from './../../documents.json';
import { DocumentImagesModel } from "../../shared/models/document-images.model";
import { DocumentAnnotationModel } from "../../shared/models/document-annotation.model";
import { AnnotationsModel } from "../../shared/models/annotations.model";
import { NotificationService } from "../../shared/services/notification/notification.service";
import { ZoomService } from "../../shared/services/zoom/zoom.service";
import { AnnotationMenuComponent } from "../../annotations/annotation-menu/annotation-menu.component";


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
  scaleValue!: number;
  annotations: DocumentAnnotationModel[] = [];
  annotationsPayload: DocumentAnnotationModel[] = [];
  result: AnnotationsModel[] = [];
  private destroy$ = new Subject<void>();

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
    this.zoomService.setDefaultZoomLevel();
    this.zoomService.setIsZoomDisplayed(true);
    this.zoomService.notifyDisplayZoomChangedClicked();
    this.scaleValue = 100;
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

    this.notificationService.saveClicked$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.buttonClicked = true;
        this.createResult();
        console.log(JSON.stringify(this.result));
      });

    this.zoomService.zoomChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.scaleValue = this.zoomService.getZoomLevel();
      });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick);
    this.zoomService.setIsZoomDisplayed(false);
    this.destroy$.next();
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


