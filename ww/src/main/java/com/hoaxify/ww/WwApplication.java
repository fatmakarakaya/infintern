package com.hoaxify.ww;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.hoaxify.ww.hoax.HoaxService;
import com.hoaxify.ww.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ww.user.User;
import com.hoaxify.ww.user.UserService;

@SpringBootApplication
public class WwApplication {

	public static void main(String[] args) {
		SpringApplication.run(WwApplication.class, args);
	}

}
