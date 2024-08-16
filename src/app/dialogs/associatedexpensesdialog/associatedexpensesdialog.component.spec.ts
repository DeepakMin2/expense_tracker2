import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedexpensesdialogComponent } from './associatedexpensesdialog.component';

describe('AssociatedexpensesdialogComponent', () => {
  let component: AssociatedexpensesdialogComponent;
  let fixture: ComponentFixture<AssociatedexpensesdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatedexpensesdialogComponent]
    });
    fixture = TestBed.createComponent(AssociatedexpensesdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
