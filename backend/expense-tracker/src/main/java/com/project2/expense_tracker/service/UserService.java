package com.project2.expense_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.model.UserCred;
import com.project2.expense_tracker.model.UserDto;
import com.project2.expense_tracker.model.UserProfileDto;
import com.project2.expense_tracker.repo.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo userRepo;
	
	private UserDto convertToDto(User user) {
		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		
		return userDto;
	}
	
	private UserProfileDto convertToUserProfileDto(User userProfile) {
		UserProfileDto userProfileDto = new UserProfileDto();
		
		userProfileDto.setConfirmPassword(userProfile.getConfirmPassword());
		userProfileDto.setEmail(userProfile.getEmail());
		userProfileDto.setFirstName(userProfile.getFirstName());
		userProfileDto.setLastName(userProfile.getLastName());
		userProfileDto.setPassword(userProfile.getPassword());
		
		return userProfileDto;
	}
	

	public UserDto createUser(User user) {
		
		if(userRepo.findById(user.getEmail()).isPresent()) {
			throw new RuntimeException("User Already Exists");
		}
		
		if(user.getEmail()!=null && user.getFirstName()!=null
			&& user.getLastName()!=null && user.getPassword()!=null && user.getConfirmPassword()!=null) {
			
			return convertToDto(userRepo.save(user));
			
			
		}
		return null;
	}



	public UserDto authenticateUserByEmailAndPassword(UserCred userCred) {
		if(userCred.getEmail()!=null && userCred.getPassword()!=null) {
			User user = userRepo.getReferenceById(userCred.getEmail());
			
			if(user!=null && user.getPassword().equals(userCred.getPassword())) {
				UserDto userDto = new UserDto();
				userDto.setFirstName(user.getFirstName());
				userDto.setLastName(user.getEmail());
				userDto.setEmail(user.getEmail());
				
				return userDto;
			}
			
		}
		return null;
	}


	public UserProfileDto getFullProfileOfUser(String email) {
		User userProfile = userRepo.getReferenceById(email);
		
		return convertToUserProfileDto(userProfile);
	}



	
}
