import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../model/expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.css'],
  providers:[DatePipe]
})
export class ShowExpenseComponent {

  expenses: Expense[] = [];

  displayedColumns = ['name', 'amount', 'category', 'date', 'payment', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);

  constructor(private datePipe: DatePipe,private expenseService: ExpenseService){

    this.dataSource.data = this.expenseService.getExpenses().reverse();

    this.expenseService.expenses$.subscribe(expenses=>{
      this.dataSource.data = expenses.reverse();
    })

  }

  formatDate(date: Date): string{
    return this.datePipe.transform(date,'MM/dd/yyyy') || '';
  }

  editExpense(expense: Expense){
    alert('Yet to be implimented')
  }

  removeExpense(expense: Expense){
    alert('Yet to be implimented')
  }

}
