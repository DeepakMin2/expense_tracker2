import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Category } from '../model/category.model';
import { ApiService } from './apiservice.service';
import { ExpenseService } from './expense.service';
import { MatDialog } from '@angular/material/dialog';
import { AssociatedexpensesdialogComponent } from '../dialogs/associatedexpensesdialog/associatedexpensesdialog.component';
import { Expense } from '../model/expense.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[]= [];
  private expenses: Expense[] = [];
  categorySubjet = new BehaviorSubject<Category[]>(this.categories);
  category$ = this.categorySubjet.asObservable();

  constructor(private apiService: ApiService, 
    private expenseService: ExpenseService,
    private dialog: MatDialog) {
    this.loadCategories();
    this.loadExpenses();
  }
  
  private loadCategories(){
    this.apiService.fetchCategories().pipe().subscribe((categoreis)=>{
      this.categories = categoreis;
      this.categorySubjet.next(this.categories);
    })
  }

  private loadExpenses(){
    this.expenseService.getExpenses().pipe().subscribe((expenses)=>{
      this.expenses = expenses;
    })
  }

  
  getCategories(): Category[]{
    return this.categories;
  }

  getCategories$(): Observable<Category[]> {
    return this.category$;
  }

  addCategory(category: Category){
    this.apiService.addCategory(category).pipe(
      catchError(err=>{
        console.log('error adding the category', err);
        return of(null);
      })
    ).subscribe(result=>{
      if(result){
        this.categories.push(result);
        this,this.categorySubjet.next(this.categories);
        console.log('The received category Id ' + result.id)
      }
    });
  }

  removeCategory(category: Category): void {
    if(this.handleCategoryDeletion(category)){
      const index = this.categories.findIndex(cat => cat.id === category.id);
      if (index >= 0) {
        this.apiService.removeCategory(category).pipe(
          catchError(err => {
            console.log('Error Deleting Category', err);
            return of(null);
          })
        ).subscribe(() => {
          this.categories.splice(index, 1);
          this.categorySubjet.next(this.categories);
        });
      }
    }
  }

  handleCategoryDeletion(category: Category): boolean{
    const associatedExpenses = this.expenses.filter(expense=>expense.categoryDto.id==category.id);
    if(associatedExpenses.length>0){
      this.dialog.open(AssociatedexpensesdialogComponent, {
        width: '400px',
        data: { expenses: associatedExpenses, category: category }
      });
      return false;
    }
    return true;
  }
}
