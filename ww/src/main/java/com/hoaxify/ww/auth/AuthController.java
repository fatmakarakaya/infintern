package com.hoaxify.ww.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ww.shared.CurrentUser;
import com.hoaxify.ww.user.User;
import com.hoaxify.ww.user.UserRepository;
import com.hoaxify.ww.user.vm.UserVM;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}
	

}
