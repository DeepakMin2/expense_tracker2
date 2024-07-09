import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';


export interface Expense{
  name: string,
  amount: string,
  category: string,
  date: string,
  payment: string
}

var expenses: Expense[] = [{
  name: 'Test',
  date: '25/01/2021',
  amount: '00',
  category: 'something',
  payment: 'Cash'
}, {name: 'Test',
date: '25/01/2021',
amount: '00',
category: 'something',
payment: 'Cash'
}];

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {

  categories = ['Medical', 'Education', 'Taxes', 'Entertainment'];

  columnHeadings: string[] = ['name', 'date', 'amount','category', 'payment'];
  dataSource = expenses;
  

  addExpenseForm: FormGroup;

  constructor(){
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
      const newExpense: Expense = this.addExpenseForm.value;
      expenses = [...expenses,newExpense];
      this.dataSource = expenses;
      console.log(this.addExpenseForm.value)
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
}
