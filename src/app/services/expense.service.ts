import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }

  private expenses: Expense[]=[
    {name: 'Test1', amount: 0, category: 'test category', date: new Date (2023,12,25), payment: 'test pay'},
    {name: 'Test1', amount: 0, category: 'test category', date: new Date (2024,7,9), payment: 'test pay'},
  ];

  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);
  expenses$ = this.expensesSubject.asObservable();


  getExpenses(): Expense[]{
    return this.expenses;
  }

  addExpense(expense: Expense): void{
    this.expenses.push(expense);
    this.expensesSubject.next(this.expenses);
  }
}
