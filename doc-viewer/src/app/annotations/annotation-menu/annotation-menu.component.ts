import { Component, EventEmitter, Output } from '@angular/core';

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
  rotationDegrees = 0;
  opacityValue = 1;
  image = '';
  @Output() submitDelete = new EventEmitter<boolean>();
  @Output() isItemEdited = new EventEmitter<{type: string; content: string}>();

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
  }

  rotate() {
    this.rotationDegrees += 90;
  }

  submitTextValue(event: string) {
    this.isTextSubmitted = true;
    this.isTextInputDisplayed = false;
    this.submittedText = event;
    this.isItemEdited.emit({type: 'text', content: this.submittedText});
  }

  submitImage(event: string) {
    this.isImageInputDisplayed = false;
    this.isImageSubmitted = true;
    this.image = event;
    this.isItemEdited.emit({type: 'image', content: this.image});
  }


  opacityIncrease() {
    this.opacityValue += 0.1;
  }

  opacityDecrease() {
    this.opacityValue -= 0.1;
  }


}
