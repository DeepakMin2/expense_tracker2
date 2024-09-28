package com.project2.expense_tracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project2.expense_tracker.model.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {
	
	public List<Category> findByUserEmail(String email);
	
}
