import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../model/expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseDialogComponent } from '../dialogs/edit-expense-dialog/edit-expense-dialog.component';
import { DeleteExpenseDialogComponent } from '../dialogs/delete-expense-dialog/delete-expense-dialog.component';

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.css'],
  
})
export class ShowExpenseComponent {

  // expenses: Expense[] = [];

  displayedColumns = ['name', 'amount', 'category', 'date', 'payment', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);

  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog){

    this.expenseService.getExpenses().subscribe(expenses=>{
      this.dataSource.data = expenses;
    });

    this.expenseService.expenses$.subscribe(expenses=>{
      // console.log(expenses);
      this.dataSource.data = expenses;
      // console.log('This is the Data source '+this.dataSource.data);
    })


  }



  editExpense(expense: Expense){
    const dialogRef = this.dialog.open(EditExpenseDialogComponent,{
      width: '400px',
      data: {...expense}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.expenseService.updateExpense(expense,result);
      }
    });
  }

  removeExpense(expense: Expense){
    const dialogRef = this.dialog.open(DeleteExpenseDialogComponent,
      {
        width:'300px',
        data:{
          title: 'Confirm Deletion',
          message: 'Are you sure you want to Delete this expense?',
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.expenseService.deleteExpense(expense);
      }
    });
  }

}
