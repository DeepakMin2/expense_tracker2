import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private categories = ['Medical', 'Education', 'Taxes', 'Entertainment'];

  categorySubjet = new BehaviorSubject<string[]>(this.categories);
  category$ = this.categorySubjet.asObservable();

  getCategories(): string[]{
    return this.categories;
  }

  addCategory(category: string): void{
    this.categories.push(category);
  }

  removeCategory(category: string):void{
    const index = this.categories.indexOf(category);

    if(index>=0){
      this.categories.splice(index,1);
    }
  }
}
