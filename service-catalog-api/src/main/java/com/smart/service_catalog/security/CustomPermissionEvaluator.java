package com.smart.service_catalog.security;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * Class helps to determine whether a user has a permission or permissions for a
 * given domain object.
 *
 */
public class CustomPermissionEvaluator implements PermissionEvaluator {

	static Logger logger = LoggerFactory.getLogger(CustomPermissionEvaluator.class);

	/**
	 * Method for evaluating a permission.
	 *
	 * @param authentication
	 *            represents the user in question. Should not be null.
	 * @param domainObject
	 *            the domain object for which permissions should be checked. May
	 *            be null in which case implementations should return false, as
	 *            the null condition can be checked explicitly in the
	 *            expression.
	 * @param permission
	 *            a representation of the permission object as supplied by the
	 *            expression system. Not null.
	 * @return true if the permission is granted, false otherwise
	 */

	@Override
	public boolean hasPermission(Authentication auth, Object targetDomainObject, Object permission) {
		if ((auth == null) || (targetDomainObject == null) || !(permission instanceof String)) {
			return false;
		}
		final String targetType = targetDomainObject.getClass().getSimpleName().toUpperCase();
		return hasPrivilege(auth, targetType, permission.toString().toUpperCase());
	}

	/**
	 * Alternative method for evaluating a permission where only the identifier
	 * of the target object is available, rather than the target instance
	 * itself.
	 *
	 * @param authentication
	 *            represents the user in question. Should not be null.
	 * @param domainObjectId
	 *            the identifier for the object instance (usually a Long)
	 * @param domainObjectType
	 *            a String representing the target's type (usually a Java
	 *            classname). Not null.
	 * @param permission
	 *            a representation of the permission object as supplied by the
	 *            expression system. Not null.
	 * @return true if the permission is granted, false otherwise.
	 */
	@Override
	public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
		if ((auth == null) || (targetType == null) || !(permission instanceof String)) {
			return false;
		}
		return hasPrivilege(auth, targetType.toUpperCase(), permission.toString().toUpperCase());
	}

	private boolean hasPrivilege(Authentication auth, String targetType, String permission) {
		for (final GrantedAuthority grantedAuth : auth.getAuthorities()) {
			logger.info("here " + grantedAuth);
			if (grantedAuth.getAuthority().startsWith(targetType)) {
				if (grantedAuth.getAuthority().contains(permission)) {
					return true;
				}
			}
		}
		return false;
	}
}
