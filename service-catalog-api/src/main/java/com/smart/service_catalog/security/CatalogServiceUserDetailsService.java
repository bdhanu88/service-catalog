package com.smart.service_catalog.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.employee.Employee;
import com.smart.service_catalog.repository.employee.EmployeeRepository;

@Service
public class CatalogServiceUserDetailsService implements UserDetailsService {

	@Autowired
	private EmployeeRepository userRepository;

	public CatalogServiceUserDetailsService() {
		super();
	}

	// API
	@Override
	public UserDetails loadUserByUsername(final String username) {
		final Employee user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}
		System.out.println(user);
		return JwtUserFactory.create(user);
		
	}

}
