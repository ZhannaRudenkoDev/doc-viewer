import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnnotationComponent } from './text-annotation.component';

describe('TextAnnotationComponent', () => {
  let component: TextAnnotationComponent;
  let fixture: ComponentFixture<TextAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnnotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
