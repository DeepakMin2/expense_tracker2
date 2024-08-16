package com.project2.expense_tracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project2.expense_tracker.model.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Long>{
	
	List<Expense> findByUserEmail(String email);

}
