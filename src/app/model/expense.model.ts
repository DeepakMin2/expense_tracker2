import { Category } from "./category.model";

export interface Expense{
    expenseId: number,
    name: string,
    amount: number,
    categoryDto: Category,
    date: Date,
    payment: string
  }