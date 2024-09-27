package com.project2.expense_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project2.expense_tracker.filter.JwtRequestFilter;
import com.project2.expense_tracker.model.JwtResponse;
import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.model.UserCred;
import com.project2.expense_tracker.model.UserDto;
import com.project2.expense_tracker.model.UserProfileDto;
import com.project2.expense_tracker.service.UserService;
import com.project2.expense_tracker.util.JwtUtil;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/signup")
	public ResponseEntity<UserDto> createUser(@RequestBody User user){
		
		System.out.println("********** Request received ************");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setConfirmPassword(passwordEncoder.encode(user.getConfirmPassword()));
		UserDto newUserDto = userService.createUser(user);
		if(newUserDto==null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(newUserDto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody UserCred userCred){
		System.out.println("$$$$$$$$$$$$ Started the Authentication $$$$$$$$$$$$$$$$");
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(userCred.getEmail(), userCred.getPassword()));
		
		final UserDto userDto = userService.authenticateUserByEmailAndPassword(userCred);
		
		if(userDto!=null) {
			System.out.println("***********User Dto is not Null***********");
			final String jwt = jwtUtil.generateToken(userCred.getEmail());
			System.out.println("*********jwtToken: "+ jwt +"**********");
			return ResponseEntity.ok(new JwtResponse(jwt));
		}
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@GetMapping("/profile")
	public ResponseEntity<UserProfileDto> getFullProfileOfUser(@RequestParam String email){
		
		UserProfileDto userProfile = userService.getFullProfileOfUser(email);
		
		if(!(userProfile == null)) return ResponseEntity.ok(userProfile);
		
		return ResponseEntity.badRequest().build();
	}

}
