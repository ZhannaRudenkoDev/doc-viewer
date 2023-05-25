import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-annotation',
  templateUrl: './image-annotation.component.html',
  styleUrls: ['./image-annotation.component.css']
})
export class ImageAnnotationComponent {
  @Output() submitImageEvent = new EventEmitter<string>();

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.submitImageEvent.next(reader.result as string)
      };
      reader.readAsDataURL(file);
    }
  }
}
