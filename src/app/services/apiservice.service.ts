import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Expense } from '../model/expense.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private email = 'john.doe@example.com';
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/api/categories?email=john.doe@example.com');
  }

  addCategory(category: Category):Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //console.log('Body of Request' + category.category);
    return this.http.post<Category>('http://localhost:8080/api/categories?email=john.doe@example.com',category,{headers})
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
    return this.http.request<void>('DELETE','http://localhost:8080/api/categories?email=john.doe@example.com',{
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
    const expenses = this.http.get<Expense[]>('http://localhost:8080/api/expenses?email=john.doe@example.com');
    // console.log('this is the Http Response' + JSON.stringify(expenses,null,2));
    // console.log(expenses); 
    return expenses;
  }

  addExpense(expense: Expense):Observable<Expense> {
    return this.http.post<Expense>('http://localhost:8080/api/expenses?email=john.doe@example.com',expense,{headers: {
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
    return this.http.put<Expense>('http://localhost:8080/api/expenses?email=john.doe@example.com',newExpense,{headers: {
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
    return this.http.request<void>('DELETE','http://localhost:8080/api/expenses?email=john.doe@example.com',{
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
