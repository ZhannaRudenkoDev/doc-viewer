import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/header/header.component";
import { DocumentListComponent } from "./documents/document-list/document-list.component";
import { DocumentViewComponent } from "./documents/document-view/document-view.component";
import { AnnotationMenuComponent } from "./annotations/annotation-menu/annotation-menu.component";
import { TextAnnotationComponent } from "./annotations/text-annotation/text-annotation.component";
import { ImageAnnotationComponent } from "./annotations/image-annotation/image-annotation.component";
import { DraggableDirective } from "./shared/directives/draggable/draggable.directive";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NotificationService } from "./shared/services/notification/notification.service";
import { ZoomService } from "./shared/services/zoom/zoom.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DocumentListComponent,
    DocumentViewComponent,
    AnnotationMenuComponent,
    TextAnnotationComponent,
    ImageAnnotationComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ NotificationService, ZoomService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
