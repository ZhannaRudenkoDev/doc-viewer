import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { NotificationService } from "../services/notification/notification.service";
import { ZoomService } from "../services/zoom/zoom.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  zoomValue = 100;
  private subscription!: Subscription;
  constructor(private notificationService: NotificationService, private zoomService: ZoomService) {}

  ngOnInit() {
    this.subscription = this.zoomService.zoomChanged.subscribe(() => {
      this.zoomValue = this.zoomService.getZoomLevel();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onButtonClick() {
    this.notificationService.notifySaveClicked();
  }

  setZoomIncrease() {
    this.zoomService.increaseZoom();
    this.zoomService.notifyZoomClicked();
  }

  setZoomDecrease() {
    this.zoomService.decreaseZoom();
    this.zoomService.notifyZoomClicked();
  }
}
