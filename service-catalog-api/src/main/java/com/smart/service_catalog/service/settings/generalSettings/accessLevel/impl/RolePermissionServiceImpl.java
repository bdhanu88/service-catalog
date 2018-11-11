package com.smart.service_catalog.service.settings.generalSettings.accessLevel.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.auth.Permission;
import com.smart.service_catalog.model.auth.Role;
import com.smart.service_catalog.repository.rolePermission.PermissionRepository;
import com.smart.service_catalog.repository.rolePermission.RoleRepository;
import com.smart.service_catalog.security.JwtUser;
import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {

	@Autowired
	RoleRepository roleRepo;

	@Autowired
	PermissionRepository permRepo;

	private static Logger logger = LogManager.getLogger();

	@Override
	public List<Permission> getPermissionByRole(int role) {
		Role roleObj = roleRepo.findById(role).get();
		return roleObj.getPermissions();
	}

	@Override
	public List<Map<String, Object>> getPermissionTreeView(List<Permission> selectedPermissions, int selectedRole,
			int logingRole, int parentId) {

		Set<Permission> allPermissionSet = new HashSet<>();
		Set<Permission> allPermissionSetCopy = new HashSet<>();
		List<Permission> allPermissions = new ArrayList<>();
		List<Permission> childPermissions = new ArrayList<>();
		// only parent's permissions are allowed
		if (selectedRole == parentId) {
			allPermissionSet.addAll(selectedPermissions);
			for (Permission permission : allPermissionSet) {
				allPermissionSetCopy.add(permission.getParentPermission());
			}
			allPermissionSet.addAll(allPermissionSetCopy);
			allPermissions.addAll(allPermissionSet);
			
		} else {
			allPermissionSet.addAll(getPermissionByRole(parentId));
			for (Permission permission : allPermissionSet) {
				allPermissionSetCopy.add(permission.getParentPermission());
			}
			allPermissionSet.addAll(allPermissionSetCopy);
			allPermissions.addAll(allPermissionSet);
		}
		List<Map<String, Object>> childList = new ArrayList<>();
		List<Map<String, Object>> retrunList = new ArrayList<>();

		// to add checked status
		for (Permission selPerm : selectedPermissions) {
			if (allPermissions.contains(selPerm)) {
				allPermissions.get(allPermissions.indexOf(selPerm)).setChecked(true);
			}
		}
		// add parent nodes
		for (Permission permission : allPermissions) {
			if (permission.getId() == permission.getParentPermission().getId()) {
				Map<String, Object> parentMap = new HashMap<>();
				List<Map<String, Object>> childListDummy = new ArrayList<>();
				parentMap.put("text", permission.getPermissionName());
				parentMap.put("value", permission.getId());
				parentMap.put("children", childListDummy);
				if (selectedRole == logingRole) {
					parentMap.put("disabled", true);
				}
				retrunList.add(parentMap);
			} else {
				childPermissions.add(permission);
			}
		}
		// create child nodes
		for (Permission permission : childPermissions) {
			Map<String, Object> childMap = new HashMap<>();
			childMap.put("text", permission.getPermissionName());
			childMap.put("value", permission.getId());
			childMap.put("checked", permission.isChecked());
			// childMap.put("disabled",true);
			childMap.put("parent", permission.getParentPermission());
			childList.add(childMap);
		}
		// assign children to parent
		for (Map<String, Object> retMap : retrunList) {
			for (Map<String, Object> child : childList) {
				Permission parent = (Permission) child.get("parent");
				if (retMap.get("text") == parent.getPermissionName()) {
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> childDummy = (List<Map<String, Object>>) retMap.get("children");
					childDummy.add(child);
				}
			}
		}

		return retrunList;
	}

	public List<Map<String, Object>> getAllRoles(Map<String, Object> returnMap) {
		Role loginUserRole = getLoginUserRole();
		List<Role> parentRoles = new ArrayList<>();
		parentRoles.add(loginUserRole);
		List<Map<String, Object>> allRoleList = new ArrayList<>();
		List<Map<String, Object>> childrenList = new ArrayList<>();
		Map<String, Object> parentLevel = new HashMap<>();
		parentLevel.put("name", loginUserRole.getRoleName());
		parentLevel.put("id", loginUserRole.getId());
		createRoleHierarchy(loginUserRole.getChildrenRoles(), childrenList, parentRoles);
		parentLevel.put("children", childrenList);
		allRoleList.add(parentLevel);
		returnMap.put("parentRoles", parentRoles);
		return allRoleList;
	}

	public void createRoleHierarchy(List<Role> roles, List<Map<String, Object>> roleList, List<Role> parentRoles) {
		// generates the tree for the UI
		for (Role role : roles) {
			parentRoles.add(role);
			Map<String, Object> childMap = new HashMap<>();
			childMap.put("name", role.getRoleName());
			childMap.put("id", role.getId());
			roleList.add(childMap);
			if (!role.getChildrenRoles().isEmpty()) {
				List<Map<String, Object>> childRoles = new ArrayList<>();
				childMap.put("children", childRoles);
				createRoleHierarchy(role.getChildrenRoles(), childRoles, parentRoles);
			}
		}
	}

	public void saveParentRoleWithChild(int parentId, Role role) throws Exception {
		try {
			List<Role> parentchildren = new ArrayList<>();
			Role parentRole = getRoleById(parentId);
			parentchildren = parentRole.getChildrenRoles();
			parentchildren.add(role);
			parentRole.setChildrenRoles(parentchildren);
			addRole(parentRole);
		} catch (Exception e) {
			logger.info(e);
		}
	}

	@Override
	public List<Permission> getSelectedPermissions(List<Integer> permissions) {
		return permRepo.findSpecificListOfPermissions(permissions);
	}

	@Override
	public Role getRoleById(int roleId) {
		return roleRepo.findById(roleId).get();
	}

	@Override
	public Role addRole(Role role) {
		return roleRepo.save(role);
	}

	@Override
	public Boolean isRoleNameAvailable(String roleName) {
		Role role = null;
		boolean exists = false;
		role = roleRepo.findByRoleName(roleName);
		if (role != null) {
			exists = true;
		}
		return exists;

	}

	@Override
	public List<Role> getAllRoles() {
		List<Role> roles = new ArrayList<>();
		List<Role> parentRoles = new ArrayList<>();
		roles.addAll(roleRepo.findAll());
		for (Role role : roles) {
			// if (role.getId() == role.getParentRole().getId()) {
			parentRoles.add(role);
			// }
		}
		return parentRoles;
	}

	@Override
	public void deleteRoleById(int roleId) {
		roleRepo.deleteById(roleId);
		// roleRepo.delete(roleRepo.findOne(roleId));
	}

	@Override
	public Role
    getLoginUserRole() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		JwtUser user = (JwtUser) auth.getPrincipal();
		return user.getUserRole();
	}
}
