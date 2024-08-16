package com.project2.expense_tracker.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project2.expense_tracker.model.Category;
import com.project2.expense_tracker.model.CategoryDto;
import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.model.UserDto;
import com.project2.expense_tracker.repo.CategoryRepo;
import com.project2.expense_tracker.repo.UserRepo;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepo categoryRepo;
	
	@Autowired
	UserRepo userRepo;
	
	private CategoryDto convertToDto(Category category){
		
		CategoryDto categoryDto = new CategoryDto();
		
		categoryDto.setCategory(category.getCategory());
		categoryDto.setId(category.getId());
		
		UserDto userDto = new UserDto();
		userDto.setEmail(category.getUser().getEmail());
		userDto.setFirstName(category.getUser().getFirstName());
		userDto.setLastName(category.getUser().getLastName());
		
		categoryDto.setUserDto(userDto);
		
		return categoryDto;
		
	}

	public List<CategoryDto> getAllCategoriesOfUser(String email) {
		User user = userRepo.findById(email).orElseThrow(()-> new RuntimeException("User Not Found"));
		
		List<Category> categories = categoryRepo.findByUserEmail(email);
		
		
		
		return categories.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public CategoryDto addCategoryOfUser(String email, CategoryDto categoryDto) {
		
		User user = userRepo.findById(email).orElseThrow(()-> new RuntimeException("User Not Found"));
		List<Category> categories = categoryRepo.findByUserEmail(email);

		
		Optional<Category> category = categories.stream().filter(cat->cat.getCategory().equals(categoryDto.getCategory())).findFirst();
		
		if (category.isPresent()) return null;
		else {
			Category newCategory = new Category();
			
			newCategory.setCategory(categoryDto.getCategory());
			newCategory.setUser(user);
			
			Category savedCategory = categoryRepo.save(newCategory);
			
			System.out.println(savedCategory.getId());
			
			return this.convertToDto(savedCategory);
		}
	}

	public void deleteCategoryOfUser(String email, CategoryDto categoryDto) {
		categoryRepo.deleteById(categoryDto.getId());	
	}

}
