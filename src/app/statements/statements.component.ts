import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css'],
  providers: [DatePipe]
})
export class StatementsComponent {
  years: number[]=[];
  months: string[]=['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth: string = '';
  selectedYear: number = 0;

  displayedColumns = ['name', 'amount', 'category', 'date', 'payment'];
  dataSource = new MatTableDataSource<Expense>([]);

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe){}
  ngOnInit(){
    const currentYear = new Date().getFullYear();
    for(let year = 2020;year<=currentYear;year++){
      this.years.push(year);
    }
  }

  onMonthSelect(year: number, month: string){
    this.selectedMonth = month;
    this.selectedYear = year;
    this.dataSource.data = this.expenseService.getExpensesByMonth(year,month);
    console.log(year + month);
  }


  downloadTransactions(){
    console.log(this.dataSource.data);
  }
}
