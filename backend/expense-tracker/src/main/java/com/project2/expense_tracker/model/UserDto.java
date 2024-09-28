package com.project2.expense_tracker.model;

import java.util.ArrayList;

public class UserDto {
	private String firstName;
	private String lastName;
	private String email;
//	private ArrayList<Expense> expenses;
//	
//	public ArrayList<Expense> getExpenses() {
//		return expenses;
//	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
