import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private buttonClickedSource = new Subject<void>();
  saveClicked$ = this.buttonClickedSource.asObservable();

  notifySaveClicked() {
    this.buttonClickedSource.next();
  }
}
