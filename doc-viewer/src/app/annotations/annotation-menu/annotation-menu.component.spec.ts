import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationMenuComponent } from './annotation-menu.component';

describe('AnnotationMenuComponent', () => {
  let component: AnnotationMenuComponent;
  let fixture: ComponentFixture<AnnotationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotationMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
