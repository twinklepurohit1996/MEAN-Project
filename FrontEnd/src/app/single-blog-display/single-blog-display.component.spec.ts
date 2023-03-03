import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogDisplayComponent } from './single-blog-display.component';

describe('SingleBlogDisplayComponent', () => {
  let component: SingleBlogDisplayComponent;
  let fixture: ComponentFixture<SingleBlogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBlogDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBlogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
