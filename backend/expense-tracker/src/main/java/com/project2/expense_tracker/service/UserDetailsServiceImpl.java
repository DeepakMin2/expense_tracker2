package com.project2.expense_tracker.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project2.expense_tracker.model.User;
import com.project2.expense_tracker.repo.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Optional<User> user = userRepo.findById(username);
		
		if(user.isPresent()) {
			return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), new ArrayList<>());
		}
		
		throw new UsernameNotFoundException("User not Found");
	}

}
