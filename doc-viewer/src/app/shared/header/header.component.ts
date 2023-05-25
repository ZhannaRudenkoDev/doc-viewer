import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

import { NotificationService } from "../services/notification/notification.service";
import { ZoomService } from "../services/zoom/zoom.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  zoomValue = 100;
  isZoomDisplayed = false;
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private zoomService: ZoomService) {}

  ngOnInit() {
    this.isZoomDisplayed = this.zoomService.getIsZoomDisplayed();
    this.zoomService.zoomChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.zoomValue = this.zoomService.getZoomLevel();
      });

    this.zoomService.zoomDisplayChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isZoomDisplayed = this.zoomService.getIsZoomDisplayed();
        this.zoomValue = this.zoomService.getZoomLevel();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
