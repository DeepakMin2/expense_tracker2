import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpenseDialogComponent } from './delete-expense-dialog.component';

describe('DeleteExpenseDialogComponent', () => {
  let component: DeleteExpenseDialogComponent;
  let fixture: ComponentFixture<DeleteExpenseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteExpenseDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
