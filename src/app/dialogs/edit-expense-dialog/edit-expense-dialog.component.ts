import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from 'src/app/model/expense.model';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.css']
})
export class EditExpenseDialogComponent {

  editExpenseForm: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Expense
  ){
    this.editExpenseForm = new FormGroup({
      name: new FormControl(dialogData.name,[Validators.required]),
      amount: new FormControl(dialogData.amount,[Validators.required]),
      category: new FormControl(dialogData.category,[Validators.required]),
      date: new FormControl(dialogData.date,[Validators.required]),
      payment: new FormControl(dialogData.payment,[Validators.required])
    })
  }

  onSave(){
    if(this.editExpenseForm.valid){
      this.dialogRef.close(this.editExpenseForm.value);
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
