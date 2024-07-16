import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category-service.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
 
  categories:string[] = [];

  displayedColumns: string[] = ['name', 'amount', 'category', 'date', 'payment'];
  dataSource2 = new MatTableDataSource<Expense>([]);
  

  addExpenseForm: FormGroup;

  constructor( private expenseService: ExpenseService,
    private categoryService: CategoryService){
    this.dataSource2.data = expenseService.getExpenses().slice(-5);
    this.categories = categoryService.getCategories();
    
    this.addExpenseForm = new FormGroup({
      expenseName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      payment: new FormControl('',[Validators.required])
    });

    this.expenseService.expenses$.subscribe(expenses =>{
      this.dataSource2.data = expenses.slice(-5);
    });
    this.categoryService.category$.subscribe(categories=>{
      this.categories = categories;
    });
  }

  onAddExpense(){
    if(this.addExpenseForm.valid){
      const newExpense: Expense = {
        name: this.addExpenseForm.value.expenseName,
        amount: this.addExpenseForm.value.amount,
        category: this.addExpenseForm.value.category,
        date: this.addExpenseForm.value.date,
        payment: this.addExpenseForm.value.payment,
      }
      this.expenseService.addExpense(newExpense);


    }
    
    
  }

  addCategory(event: MatChipInputEvent):void{
    const input =  event.chipInput.inputElement;
    const value = event.value.trim();

    this.categoryService.addCategory(value);
    if(input){
      input.value = '';
    }
  }

  removeCategory(category: string): void {
  this.categoryService.removeCategory(category);
  }
}
