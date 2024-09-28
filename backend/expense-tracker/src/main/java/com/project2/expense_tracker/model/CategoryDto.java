package com.project2.expense_tracker.model;


public class CategoryDto {

	private Long id;


	private String category;
	

	private UserDto userDto;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public UserDto getUserDto() {
		return userDto;
	}


	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}
}
