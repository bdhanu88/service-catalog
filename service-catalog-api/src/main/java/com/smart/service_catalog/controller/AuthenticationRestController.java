package com.smart.service_catalog.controller;

import javax.servlet.http.HttpServletRequest;

import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;
import com.smart.service_catalog.model.auth.JwtAuthenticationRequest;
import com.smart.service_catalog.model.auth.JwtAuthenticationResponse;
import com.smart.service_catalog.security.JwtTokenUtil;
import com.smart.service_catalog.security.JwtUser;
import com.smart.service_catalog.service.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.smart.service_catalog.security.CatalogServiceUserDetailsService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationRestController {

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private CatalogServiceUserDetailsService userDetailsService;

	@Autowired
    EmployeeService ser;

	@Autowired
    RolePermissionService rolePermService;

	@RequestMapping(value = "auth", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			Device device) throws AuthenticationException {

		// Perform the security
		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
						authenticationRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Reload password post-security so we can generate token
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails, device);

		// Return the token
        Map<String,Object> retMap=new HashMap<String,Object>();
        retMap.put("token",new JwtAuthenticationResponse(token));
        retMap.put("permissions",rolePermService.getLoginUserRole().getPermissions());
		return ResponseEntity.ok(retMap);
	}

	@RequestMapping(value = "refresh", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);

		if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
			String refreshedToken = jwtTokenUtil.refreshToken(token);
			return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}


}
