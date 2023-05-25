import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AnnotationMenuComponent } from './annotation-menu/annotation-menu.component';
import { TextAnnotationComponent } from './text-annotation/text-annotation.component';
import { FormsModule } from "@angular/forms";
import { ImageAnnotationComponent } from './image-annotation/image-annotation.component';
import { DraggableDirective } from './draggable.directive';
import { NotificationService } from "./services/notification.service";
import { ZoomService } from "./services/zoom.service";


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
