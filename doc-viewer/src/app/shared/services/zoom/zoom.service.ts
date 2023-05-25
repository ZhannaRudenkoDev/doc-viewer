import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private zoomLevel = 100;
  private buttonClickedSource = new Subject<void>();
  zoomChanged = this.buttonClickedSource.asObservable();

  notifyZoomClicked() {
    this.buttonClickedSource.next();
  }

  increaseZoom(): void {
    if(this.zoomLevel !== 100) {
      this.zoomLevel += 10;
    }
  }

  decreaseZoom(): void {
    if(this.zoomLevel !== 0) {
      this.zoomLevel -= 10;
    }
  }

  getZoomLevel(): number {
    return this.zoomLevel
  }
}