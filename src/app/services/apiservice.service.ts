import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Expense } from '../model/expense.model';
import { Category } from '../model/category.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private user: User ={
    userId: '21',
    firstName: 'Katie',
    lastName: 'Miller',
    email: 'katie.miller@example.com'
  } 
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUser(): User {
    return this.user;
  }

  /*Categories API Calls*/
  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories?email=${this.user.email}`);
  }

  addCategory(category: Category):Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //console.log('Body of Request' + category.category);
    return this.http.post<Category>(`${this.apiUrl}/categories?email=${this.user.email}`,category,{headers})
    .pipe(
      map(result=>{
        console.log('API object ID '+result.id);
        return result;
      })
      ,catchError(err=>{
        console.log('Error adding category ', err);
        return throwError(()=> new Error('Failed to add category'));
      })
    );
  }

  removeCategory(category: Category): Observable<void> {
    return this.http.request<void>('DELETE',`${this.apiUrl}/categories?email=${this.user.email}`,{
      body: category,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(err=>{
      console.log('Error Deleting the Category',err);
      return throwError(()=> new Error('Error Deleting the Category'));
    }));
  }


/*Expensese API Calls*/
  
fetchExpenses():Observable<Expense[]>{
    const expenses = this.http.get<Expense[]>(`${this.apiUrl}/expenses?email=${this.user.email}`);
    // console.log('this is the Http Response' + JSON.stringify(expenses,null,2));
    // console.log(expenses); 
    return expenses;
  }

  addExpense(expense: Expense):Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses?email=${this.user.email}`,expense,{headers: {
      'Content-Type': 'application/json'
    }}).pipe(
      map(result=>{
        return result;
      }),
      catchError(err=>{
        console.log('Error Adding Expense', err);
        return throwError(()=> new Error(err));
      })
    )
  }

  updateExpense(newExpense: Expense):Observable<Expense>{
    return this.http.put<Expense>(`${this.apiUrl}/expenses?email=${this.user.email}`,newExpense,{headers: {
      'Content-Type': 'application/json'
    }}).pipe(
      map(result=>{
        return result
      }),
      catchError(err=>{
        console.log('Error Updating Expense', err);
        return throwError(()=> new Error('Error Updating the Expense'))
      })
    )
  }
  
  deleteExpense(expense: Expense):Observable<void>{
    return this.http.request<void>('DELETE',`${this.apiUrl}/expenses?email=${this.user.email}`,{
      body: expense,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(err=>{
        console.log('Error Deleting Expense', err)
        return throwError(()=>new Error('Error Deleting Expense '));
      })
    )
  }

}
