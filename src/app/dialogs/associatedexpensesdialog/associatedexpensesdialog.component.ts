import { Component, Inject, INJECTOR } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/category.model';
import { Expense } from 'src/app/model/expense.model';

@Component({
  selector: 'app-associatedexpensesdialog',
  templateUrl: './associatedexpensesdialog.component.html',
  styleUrls: ['./associatedexpensesdialog.component.css']
})
export class AssociatedexpensesdialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {expenses: Expense[], category: Category},
                public dialogRef: MatDialogRef<AssociatedexpensesdialogComponent>){}

  onClose(): void {
    this.dialogRef.close(false);
  }

}
