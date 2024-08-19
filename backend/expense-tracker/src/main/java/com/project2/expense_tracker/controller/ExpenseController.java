package com.project2.expense_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project2.expense_tracker.model.ExpenseDto;
import com.project2.expense_tracker.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	@Autowired
	ExpenseService expenseService;
	
	@GetMapping
	public ResponseEntity<List<ExpenseDto>> getAllExpensesOfUser(@RequestParam String email){
		
		List<ExpenseDto> expenses = expenseService.getAllExpensesOfUser(email);
		
		if(expenses==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		
		return ResponseEntity.ok(expenses);
	}
	
	@PostMapping
	public ResponseEntity<ExpenseDto> saveExpenseOfUser(@RequestParam String email, @RequestBody ExpenseDto expenseDto) {
		ExpenseDto savedExpense = expenseService.saveExpenseOfUser(email,expenseDto);
		
		if(savedExpense==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		
		return ResponseEntity.ok(savedExpense);
		
	}
	
	@PutMapping
	public ResponseEntity<ExpenseDto> updateExpenseOfUser(@RequestParam String email, @RequestBody ExpenseDto expenseDto){
		
		ExpenseDto updatedExpense = expenseService.updateExpenseOfUser(email,expenseDto);
		return ResponseEntity.ok(updatedExpense);
	}
	
	@DeleteMapping
	public void deleteExpenseOfUser(@RequestParam String email, @RequestBody ExpenseDto expenseDto) {
		expenseService.deleteExpenseOfUser(email,expenseDto);
	}
}