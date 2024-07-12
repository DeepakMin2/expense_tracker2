import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from 'src/app/model/expense.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.css']
})
export class EditExpenseDialogComponent {

  editExpenseForm: FormGroup;
  categories:string[]=[];
  

  constructor(
    public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Expense,
    private categoryService: CategoryService
  ){
    this.editExpenseForm = new FormGroup({
      name: new FormControl(dialogData.name,[Validators.required]),
      amount: new FormControl(dialogData.amount,[Validators.required]),
      category: new FormControl(dialogData.category,[Validators.required]),
      date: new FormControl(dialogData.date,[Validators.required]),
      payment: new FormControl(dialogData.payment,[Validators.required])
    });

    this.categoryService.category$.subscribe(categories=>{
      this.categories = categories;
    });
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
