import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-annotation-menu',
  templateUrl: './annotation-menu.component.html',
  styleUrls: ['./annotation-menu.component.css']
})
export class AnnotationMenuComponent {
  isModalDisplayed = true;
  isMenuDisplayed = true;
  isTextInputDisplayed = false;
  isImageInputDisplayed = false;
  isTextSubmitted = false;
  submittedText = ''
  isImageSubmitted = false;
  image = '';
  @Output() submitDelete = new EventEmitter<boolean>();

  displayTextInput() {
    this.isMenuDisplayed = false;
    this.isTextInputDisplayed = true;
  }

  displayImageInput() {
    this.isMenuDisplayed = false;
    this.isImageInputDisplayed = true;
  }

  closeModal() {
    this.submitDelete.emit(true);
    //this.isModalDisplayed = false;
  }

  submitTextValue(event: string) {
    this.isTextSubmitted = true;
    this.isTextInputDisplayed = false;
    this.submittedText = event;
  }

  submitImage(event: string) {
    this.isImageInputDisplayed = false;
    this.isImageSubmitted = true;
    this.image = event;
  }


}
