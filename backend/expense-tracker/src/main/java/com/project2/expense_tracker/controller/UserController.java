package com.project2.expense_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.model.UserCred;
import com.project2.expense_tracker.model.UserDto;
import com.project2.expense_tracker.model.UserProfileDto;
import com.project2.expense_tracker.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<UserDto> createUser(@RequestBody User user){
		UserDto newUserDto = userService.createUser(user);
		if(newUserDto==null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(newUserDto);
	}
	
	@GetMapping("/login")
	public ResponseEntity<UserDto> authenticateUser(@RequestBody UserCred userCred){
		UserDto userDto = userService.authenticateUserByEmailAndPassword(userCred);
		if(userDto == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		return ResponseEntity.ok(userDto);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<UserProfileDto> getFullProfileOfUser(@RequestParam String email){
		
		UserProfileDto userProfile = userService.getFullProfileOfUser(email);
		
		if(!(userProfile == null)) return ResponseEntity.ok(userProfile);
		
		return ResponseEntity.badRequest().build();
	}

}
