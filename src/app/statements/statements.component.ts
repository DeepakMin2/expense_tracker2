import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css'],
})
export class StatementsComponent {
  years: number[]=[];
  months: string[]=['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth: string = '';
  selectedYear: number = 0;

  displayedColumns = ['name', 'amount', 'category', 'date', 'payment'];
  //dataSource = new MatTableDataSource<Expense>([]);

  dataSources: {[key: string]: MatTableDataSource<Expense> }= {};

  constructor(private expenseService: ExpenseService){}
  ngOnInit(){
    const currentYear = new Date().getFullYear();
    for(let year = 2020;year<=currentYear;year++){
      this.years.push(year);
    }
  }

  // onMonthSelect(year: number, month: string){
  //   this.selectedMonth = month;
  //   this.selectedYear = year;
  //   this.dataSource.data = this.expenseService.getExpensesByMonth(year,month);
  //   console.log(year + month);
  // }

  onMonthSelect(year: number, month: string){
    this.selectedMonth = month;
    this.selectedYear = year;
    const key =  `${year}-${month}`;
    if(!this.dataSources[key]){
      const expenses = this.expenseService.getExpensesByMonth(year, month);
      this.dataSources[key] = new MatTableDataSource(expenses);
    }
    
  }

  getDataSource(year: number, month: string): MatTableDataSource<Expense>{
    const key = `${year}-${month}`;
    return this.dataSources[key];
  }

  downloadTransactions(year: number, month: string){
    const key = `${year}-${month}`;
    console.log(this.dataSources[key].data);
  }
}
