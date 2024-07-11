import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  providers: [DatePipe]
})
export class AddExpenseComponent {
 
  categories = ['Medical', 'Education', 'Taxes', 'Entertainment'];

  displayedColumns: string[] = ['name', 'amount', 'category', 'date', 'payment'];
  dataSource2 = new MatTableDataSource<Expense>([]);
  

  addExpenseForm: FormGroup;

  constructor( private datePipe: DatePipe, private expenseService: ExpenseService){
    this.dataSource2.data = expenseService.getExpenses().slice(-5);
    console.log('initially loaded array ');
    
    this.addExpenseForm = new FormGroup({
      expenseName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      payment: new FormControl('',[Validators.required])
    });

    this.expenseService.expenses$.subscribe(expenses =>{
      this.dataSource2.data = expenses.slice(-5);
      console.log('subscribe is called to load array');
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

    this.categories.push(value)
    if(input){
      input.value = '';
    }
  }

  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);

    if(index>=0){
      this.categories.splice(index,1);
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date,'MM/dd/yyyy') || '';
  }
}
