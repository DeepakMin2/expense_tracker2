import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/category.model';
import { Expense } from 'src/app/model/expense.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.css']
})
export class EditExpenseDialogComponent implements OnInit{

  editExpenseForm: FormGroup;
  categories:Category[]=[];
  

  constructor(
    public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Expense,
    private categoryService: CategoryService
  ){
    this.editExpenseForm = new FormGroup({
      name: new FormControl(dialogData.name,[Validators.required]),
      amount: new FormControl(dialogData.amount,[Validators.required]),
      categoryDto: new FormControl(dialogData.categoryDto,[Validators.required]),
      date: new FormControl(dialogData.date,[Validators.required]),
      payment: new FormControl(dialogData.payment,[Validators.required])
    });

    
  }
  ngOnInit(): void {
    this.categoryService.getCategories$().subscribe(categories => {
      this.categories = categories;
    });
    if(this.dialogData.categoryDto){
      const seletcedCategory = this.categories.find(category=> category.id==this.dialogData.categoryDto.id);
      if(seletcedCategory){
        this.editExpenseForm.get('CategoryDto')?.setValue(seletcedCategory);
      }
    }
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
