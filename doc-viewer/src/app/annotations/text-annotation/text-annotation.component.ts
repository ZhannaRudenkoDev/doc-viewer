import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-annotation',
  templateUrl: './text-annotation.component.html',
  styleUrls: ['./text-annotation.component.css']
})
export class TextAnnotationComponent {
  inputValue = '';
  @Output() submitValueEvent = new EventEmitter<string>();

  submitValue() {
    this.submitValueEvent.next(this.inputValue);
  }
}
