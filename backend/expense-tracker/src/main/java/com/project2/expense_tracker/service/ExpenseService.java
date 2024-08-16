package com.project2.expense_tracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project2.expense_tracker.model.Category;
import com.project2.expense_tracker.model.CategoryDto;
import com.project2.expense_tracker.model.Expense;
import com.project2.expense_tracker.model.ExpenseDto;
import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.model.UserDto;
import com.project2.expense_tracker.repo.CategoryRepo;
import com.project2.expense_tracker.repo.ExpenseRepo;
import com.project2.expense_tracker.repo.UserRepo;

@Service
public class ExpenseService {
	@Autowired
	ExpenseRepo expenseRepo;
	
	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	UserRepo userRepo;
	

	private ExpenseDto convertToDto(Expense savedExpense) {
		ExpenseDto expenseDto = new ExpenseDto();
		
		expenseDto.setAmount(savedExpense.getAmount());
		expenseDto.setDate(savedExpense.getDate());
		expenseDto.setName(savedExpense.getName());
		expenseDto.setPayment(savedExpense.getPayment());
		expenseDto.setExpenseId(savedExpense.getExpense_Id());
		

		
		UserDto userDto = new UserDto();
		
		userDto.setEmail(savedExpense.getUser().getEmail());
		userDto.setFirstName(savedExpense.getUser().getFirstName());
		userDto.setLastName(savedExpense.getUser().getLastName());
		
		expenseDto.setUserDto(userDto);
		
		CategoryDto categoryDto = new CategoryDto();
		
		categoryDto.setCategory(savedExpense.getCategory().getCategory());
		categoryDto.setId(savedExpense.getCategory().getId());
		categoryDto.setUserDto(userDto);
		
		expenseDto.setCategoryDto(categoryDto);
		return expenseDto;
	}

	public List<ExpenseDto> getAllExpensesOfUser(String email) {
		
		List<Expense> expenses = expenseRepo.findByUserEmail(email);
		
		return expenses.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public ExpenseDto saveExpenseOfUser(String email, ExpenseDto expenseDto) {
		
		User user = userRepo.findById(email).orElseThrow(()-> new RuntimeException("User Not Found"));
		//System.out.println("***************Category Id***********"+expenseDto.getCategory().getId());
		Category category = categoryRepo.findById(expenseDto.getCategoryDto().getId()).orElseThrow(()-> new RuntimeException("Category Not Found"));
		//System.out.println("*************  Category Object *************** " + category);
		Expense expense = new Expense();
		expense.setAmount(expenseDto.getAmount());
		expense.setCategory(category);
		expense.setDate(expenseDto.getDate());
		expense.setName(expenseDto.getName());
		expense.setPayment(expenseDto.getPayment());
		expense.setUser(user);
		
		UserDto userDto = new UserDto();
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setEmail(user.getEmail());
		
		
		Expense savedExpense = expenseRepo.save(expense);
		
		return convertToDto(savedExpense);
	}


	public ExpenseDto updateExpenseOfUser(String email, ExpenseDto expenseDto) {
		User user = userRepo.findById(email).orElseThrow(()-> new RuntimeException("User not Found"));
		
		Expense exsistingExpense = expenseRepo.findById(expenseDto.getExpenseId()).orElseThrow(()-> new RuntimeException("Expense not Found"));
		if(!exsistingExpense.getUser().getEmail().equals(email)) throw new RuntimeException("User unauthorized");
		
		Category category = categoryRepo.findById(expenseDto.getCategoryDto().getId()).orElseGet(()->{
			Category newCategory = new Category();
			newCategory.setCategory(expenseDto.getCategoryDto().getCategory());
			newCategory.setUser(user);
			
			return categoryRepo.save(newCategory);
		});

		
		exsistingExpense.setAmount(expenseDto.getAmount());
		exsistingExpense.setCategory(category);
		exsistingExpense.setDate(expenseDto.getDate());
		exsistingExpense.setName(expenseDto.getName());
		exsistingExpense.setPayment(expenseDto.getPayment());
		exsistingExpense.setUser(user);
		
//		UserDto userDto = new UserDto();
//		userDto.setFirstName(user.getFirstName());
//		userDto.setLastName(user.getLastName());
//		userDto.setEmail(user.getEmail());
		
		Expense updatedExpense = expenseRepo.save(exsistingExpense);
		
		return convertToDto(updatedExpense);
	}



	public void deleteExpenseOfUser(String email, ExpenseDto expenseDto) {
		expenseRepo.deleteById(expenseDto.getExpenseId());
	}
	

}
