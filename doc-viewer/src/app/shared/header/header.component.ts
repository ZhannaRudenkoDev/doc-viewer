import { Component, OnDestroy, OnInit } from '@angular/core';

import {Subject, Subscription, takeUntil, tap} from "rxjs";
import { NotificationService } from "../services/notification/notification.service";
import { ZoomService } from "../services/zoom/zoom.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  zoomValue = 100;
  private subscription!: Subscription;
  private isDisplayedZoomSubscription!: Subscription;
  private destroy$ = new Subject();
  isZoomDisplayed = false;
  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private zoomService: ZoomService) {}

  ngOnInit() {
    this.isZoomDisplayed = this.zoomService.getIsZoomDisplayed();
    this.subscription = this.zoomService.zoomChanged.subscribe(() => {
      this.zoomValue = this.zoomService.getZoomLevel();
    });
    this.isDisplayedZoomSubscription = this.zoomService.zoomDisplayChanged.subscribe(() => {
      this.isZoomDisplayed = this.zoomService.getIsZoomDisplayed();
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
