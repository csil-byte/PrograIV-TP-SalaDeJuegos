import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaccionComponent } from './reaccion.component';

describe('ReaccionComponent', () => {
  let component: ReaccionComponent;
  let fixture: ComponentFixture<ReaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
