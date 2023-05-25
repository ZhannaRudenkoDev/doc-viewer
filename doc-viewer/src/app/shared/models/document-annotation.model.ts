import { Type } from "@angular/core";
import { AnnotationMenuComponent } from "../../annotations/annotation-menu/annotation-menu.component";

export interface DocumentAnnotationModel {
  type: Type<AnnotationMenuComponent>;
  x: number; y: number,
  index: number,
  typeData?: string,
  content?: string
}
