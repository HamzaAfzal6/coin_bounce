import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoVariationComponent } from './photo-variation.component';

describe('PhotoVariationComponent', () => {
  let component: PhotoVariationComponent;
  let fixture: ComponentFixture<PhotoVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoVariationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
