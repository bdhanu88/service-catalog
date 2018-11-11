package com.smart.service_catalog.service.settings.generalSettings.accessLevel;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.auth.Permission;
import com.smart.service_catalog.model.auth.Role;

public interface RolePermissionService {
	
	
	public List<Permission> getPermissionByRole(int role); 	 
	
	public  List<Map<String, Object>> getPermissionTreeView(List<Permission> permissions, int selectedRole, int logingRole, int parentId);

	public List<Map<String, Object>> getAllRoles(Map<String, Object> returnMap);
	
	public List<Permission> getSelectedPermissions(List<Integer> permissions);
	
	public Role getRoleById(int roleId);
	
	public Role addRole(Role role);

	public Boolean isRoleNameAvailable(String roleName);
	
	public List<Role> getAllRoles();	
	
	public void deleteRoleById(int roleId);
	
	public Role getLoginUserRole();
	
	public void saveParentRoleWithChild(int parentId, Role role) throws Exception;
}
