import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../services/expense.service';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    const dataSource = this.dataSources[key];

    if(!dataSource){
      console.log('No data available for the selected month and year.');
      return;
    }

    const doc = new jsPDF();
    autoTable(doc,{
      head: [['Name', 'Amount', 'Category', 'Date', 'Payment']],
      body: dataSource.data.map(expense=>[
        expense.name,
        expense.amount.toString(),
        expense.categoryDto.category, 
        new DatePipe('en-US').transform(expense.date,'MM/dd/yyyy'),
        expense.payment
      ] as string[]),
    });

    doc.save(`${year}_${month}_transaction.pdf`);
  }
}
