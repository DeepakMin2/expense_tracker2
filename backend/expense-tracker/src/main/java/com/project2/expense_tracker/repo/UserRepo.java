package com.project2.expense_tracker.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project2.expense_tracker.model.User;

public interface UserRepo extends JpaRepository<User, String> {

}
