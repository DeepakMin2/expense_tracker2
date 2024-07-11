import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-expense-dialog',
  templateUrl: './delete-expense-dialog.component.html',
  styleUrls: ['./delete-expense-dialog.component.css']
})
export class DeleteExpenseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  onConfirm(){
    this.dialogRef.close(true);
  }
  onCancel(){
    this.dialogRef.close(false);
  }
}
