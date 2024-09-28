import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category-service.service';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
 
  categories:Category[] = [];

  displayedColumns: string[] = ['name', 'amount', 'category', 'date', 'payment'];
  dataSource2 = new MatTableDataSource<Expense>([]);
  

  addExpenseForm: FormGroup;

  constructor( private expenseService: ExpenseService,
    private categoryService: CategoryService){
    expenseService.getExpenses().subscribe(expenses=>{
      this.dataSource2.data = expenses.slice(-5);
    });
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
        expenseId: 0,
        name: this.addExpenseForm.value.expenseName,
        amount: this.addExpenseForm.value.amount,
        categoryDto: this.addExpenseForm.value.category,
        date: this.addExpenseForm.value.date,
        payment: this.addExpenseForm.value.payment,
      }
      this.expenseService.addExpense(newExpense);


    }
    
    
  }

  addCategory(event: MatChipInputEvent):void{
    const input =  event.chipInput.inputElement;
    const value = event.value.trim();

    const newCategory: Category = {
      category: value,
      id: 0
    }
    this.categoryService.addCategory(newCategory);
    if(input){
      input.value = '';
    }
  }

  removeCategory(category: Category): void {

  this.categoryService.removeCategory(category);
  }
}
