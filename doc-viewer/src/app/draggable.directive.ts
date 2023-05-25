import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';


@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  private finalX!: number;
  private finalY!: number;
  private initialX = 0;
  private initialY = 0;
  private canDrag = false;

  @HostBinding('class.draggable') draggable = true;

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (this.shouldStartDrag(event)) {
      this.canDrag = true;
      this.startDrag(event);
    }
  }

  @HostListener('document:mouseup') onMouseUp() {
    this.endDrag();
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.handleDrag(event);
  }

  private shouldStartDrag(event: MouseEvent): boolean {
    const clickedElement = event.target as HTMLElement;
    return clickedElement.classList.contains('positioned-component');
  }

  private startDrag(event: MouseEvent) {
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  private handleDrag(event: MouseEvent) {
    if (this.canDrag) {
      const deltaX = event.clientX - this.initialX;
      const deltaY = event.clientY - this.initialY;
      const transformValue = `translate(${deltaX}px, ${deltaY}px)`;
      this.finalY = deltaY;
      this.finalX = deltaX;
      this.draggableElement.style.transform = transformValue;
    }
  }

  private endDrag() {
    this.initialX = 0;
    this.initialY = 0;
    this.canDrag = false;
  }

  private get draggableElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef) {}
}
