import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';


export interface Expense{
  name: string,
  amount: number,
  category: string,
  date: Date,
  payment: string
}



const EXPENSES_DATA: Expense[] = [
  {name: 'Test1', amount: 0, category: 'test category', date: new Date (2024,7,9), payment: 'test pay'},
  {name: 'Test1', amount: 0, category: 'test category', date: new Date (2024,7,9), payment: 'test pay'},
];


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  providers: [DatePipe]
})
export class AddExpenseComponent {
 

  categories = ['Medical', 'Education', 'Taxes', 'Entertainment'];

  displayedColumns: string[] = ['name', 'amount', 'category', 'date', 'payment'];
  dataSource2 = new MatTableDataSource<Expense>(EXPENSES_DATA);
  

  addExpenseForm: FormGroup;

  constructor( private datePipe: DatePipe){
    this.addExpenseForm = new FormGroup({
      expenseName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      payment: new FormControl('',[Validators.required])
    })
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
      this.dataSource2.data = [...this.dataSource2.data.slice(-4), newExpense]

      console.log(newExpense)


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
