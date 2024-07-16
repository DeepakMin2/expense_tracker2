import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {



  constructor() { }

  private expenses: Expense[]=[
    {name: 'Test1', amount: 0, category: 'test category', date: new Date (2023,11,25), payment: 'test pay'},
    {name: 'Test2', amount: 10, category: 'test category2', date: new Date (2024,0,9), payment: 'test pay2'},
    {name: 'Test3', amount: 40, category: 'test category3', date: new Date (2024,2,12), payment: 'test pay3'}
  ];

  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);
  expenses$ = this.expensesSubject.asObservable();

  months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];


  getExpenses(): Expense[]{
    return this.expenses;
  }

  addExpense(expense: Expense): void{
    this.expenses.push(expense);
    this.expensesSubject.next(this.expenses);
  }

  updateExpense(oldExpense: Expense, newExpense: Expense){
    const expenses = this.getExpenses();
    const index = expenses.findIndex(exp=>exp === oldExpense);
    console.log('index number' + index);
    if(index!==-1){
      expenses[index] = newExpense;
      this.expensesSubject.next([...expenses]);
    }
  }

  deleteExpense(expense: Expense) {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(exp=> exp===expense);

    if(index!==-1){
      expenses.splice(index,1);
      this.expensesSubject.next([...expenses]);
    }
  }
  
  getExpensesByMonth(year: number, month: string): Expense[] {
    const monthIndex = this.months.indexOf(month);
    return this.expenses.filter(expense=>{
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear()===year && expenseDate.getMonth()===monthIndex;
    });
  }
}
