import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private zoomLevel = 100;
  private buttonClickedSource = new Subject<void>();
  private zoomDisplayChangedSource = new Subject<void>();
  private isZoomDisplayed = false;
  zoomChanged = this.buttonClickedSource.asObservable();
  zoomDisplayChanged = this.zoomDisplayChangedSource.asObservable();

  notifyZoomClicked() {
    this.buttonClickedSource.next();
  }

  notifyDisplayZoomChangedClicked() {
    this.zoomDisplayChangedSource.next();
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

  setDefaultZoomLevel() {
   this.zoomLevel = 100;
  }

  getIsZoomDisplayed() {
    return this.isZoomDisplayed;
  }

  setIsZoomDisplayed(flag: boolean) {
    this.isZoomDisplayed = flag;
  }

}
