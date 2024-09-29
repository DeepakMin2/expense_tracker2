package com.project2.expense_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project2.expense_tracker.model.CategoryDto;
import com.project2.expense_tracker.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryDto>> getAllCategoriesOfUser(Authentication authentication){
		
		String email = authentication.getName();
		//System.out.println("*******Request Received**********");
		List<CategoryDto> categoriesDto =  categoryService.getAllCategoriesOfUser(email);
		
		if(categoriesDto==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		
		return ResponseEntity.ok(categoriesDto);
		
	}
	
	@PostMapping
	public ResponseEntity<CategoryDto> addCategoryOfUser(Authentication authentication, @RequestBody CategoryDto categoryDto){
		
		String email = authentication.getName();
		
		CategoryDto newCategoryDto = categoryService.addCategoryOfUser(email,categoryDto);
		
		if(newCategoryDto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
		//System.out.println(newCategoryDto.getId());
		return ResponseEntity.ok(newCategoryDto);
	}
	
	@DeleteMapping
	public void deleteCategoryOfUser(Authentication authentication, @RequestBody CategoryDto categoryDto){
		//System.out.println("*******Request Received**********");
		
		String email = authentication.getName();
		
		categoryService.deleteCategoryOfUser(email,categoryDto);
	}
}
