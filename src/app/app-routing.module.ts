import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ShowExpenseComponent } from './show-expense/show-expense.component';
import { StatementsComponent } from './statements/statements.component';
import { ProfileComponent } from './profile/profile.component';
import { authGaurd } from './auth/auth-gaurd.guard';

const routes: Routes = [
  {path:'', component: LoginComponent},
  // {path:'**', redirectTo: '/login'},
  {path:'home', component: HomeComponent, canActivate: [authGaurd]},
  {path:'login', component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path: 'addExpense', component: AddExpenseComponent, canActivate:[authGaurd]},
  {path:'showExpense', component: ShowExpenseComponent, canActivate:[authGaurd]},
  {path: 'statements', component: StatementsComponent, canActivate:[authGaurd]},
  {path:'profile', component: ProfileComponent, canActivate:[authGaurd]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
