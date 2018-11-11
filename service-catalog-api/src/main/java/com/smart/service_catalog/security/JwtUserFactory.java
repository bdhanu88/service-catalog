package com.smart.service_catalog.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.smart.service_catalog.model.auth.Permission;
import com.smart.service_catalog.model.employee.Employee;

public final class JwtUserFactory {

	private JwtUserFactory() {
	}

	public static JwtUser create(Employee user) {
		return new JwtUser(user.getId(), user.getUsername(), user.getFirstName(), user.getLastname(), user.getEmail(),
				user.getPassword(), mapToGrantedAuthorities(user.getRole().getPermissions()), user.getEnabled(),
				user.getLastPasswordResetDate(), user.getRole());
	}

	private static List<GrantedAuthority> mapToGrantedAuthorities(List<Permission> permissions) {
		return permissions.stream().map(permission -> new SimpleGrantedAuthority(permission.getPermissionName()))
				.collect(Collectors.toList());
	}
}
