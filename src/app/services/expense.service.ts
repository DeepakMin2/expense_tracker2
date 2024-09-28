import { Injectable } from '@angular/core';
import { Expense } from '../model/expense.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  private expenses: Expense[]=[ ];

  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);
  expenses$ = this.expensesSubject.asObservable();

  months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];



  constructor(private apiService: ApiService) { 
    this.loadExpenses();
  }

  loadExpenses() {
    this.apiService.fetchExpenses().pipe(
      map(expenses=>
        expenses.map(expense=>({
          expenseId: expense.expenseId,
          name: expense.name,
          amount: expense.amount,
          categoryDto: expense.categoryDto,
          date: expense.date,
          payment: expense.payment
        }))
      ),
      catchError(err=>{
        console.error('Fetching expenses Failed', err);
        return of([]);
      })      
    ).subscribe((mappedExpenses)=>{
      this.expenses = mappedExpenses;
      this.expensesSubject.next(this.expenses);
    })
  }
  getExpenses(): Observable<Expense[]>{
    //console.log('This is teh Expenses List*' + this.expenses);
    return this.expenses$
  }

  addExpense(expense: Expense): void{
    // this.expenses.push(expense);
    // this.expensesSubject.next(this.expenses);
    this.apiService.addExpense(expense).pipe(
      catchError(err=>{
        console.log('Error Adding Expense',err);
        return of(null);
      })
    ).subscribe(result=>{
      if(result){
        this.expenses.push(result);
        this.expensesSubject.next(this.expenses);
      }
    });
  }

  updateExpense(oldExpense: Expense, newExpense: Expense){
    console.log('New Expense', newExpense);
    console.log('New Expense Category ', newExpense.categoryDto);
    
    const index = this.expenses.findIndex(exp=>exp === oldExpense);
    if(index!==-1){
      newExpense.expenseId = oldExpense.expenseId;
      this.apiService.updateExpense(newExpense).subscribe(
        result=>{
          this.expenses[index] = result;
          this.expensesSubject.next(this.expenses);
        }
      )
    }
  }

  deleteExpense(expense: Expense) {
    const index = this.expenses.findIndex(exp=> exp===expense);
    this.apiService.deleteExpense(expense).pipe(
      catchError(err=>{
        console.log('Error Deleting Expense ', err);
        return of(null);
      })
    ).subscribe(
      ()=>{
        if(index>=0){
          this.expenses.splice(index,1);
          this.expensesSubject.next(this.expenses);
        }
      }
    )
  }
  
  getExpensesByMonth(year: number, month: string): Expense[] {
    const monthIndex = this.months.indexOf(month);
    //console.log(`Month Index: ${monthIndex}`);
    return this.expenses.filter(expense=>{
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getUTCFullYear();
      const expenseMonth = expenseDate.getUTCMonth(); 
      // console.log(`Year ${expenseDate.getFullYear()} and Month ${expenseDate.getMonth()}`);
      return expenseYear===year && expenseMonth===monthIndex;
    });
    // return [];
  }
}

