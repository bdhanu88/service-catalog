package com.smart.service_catalog.controller;

import com.smart.service_catalog.model.auth.Permission;
import com.smart.service_catalog.model.auth.Role;
import com.smart.service_catalog.model.company.Company;
import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;
import com.smart.service_catalog.service.settings.generalSettings.company.CompanyProfileService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("accessLevel")
public class AccessLevelRestController {

	@Autowired
	RolePermissionService rolePermService;
	@Autowired
    private CompanyProfileService  companyProfileService;

	private static Logger logger = LogManager.getLogger();

	@GetMapping("getPermissionsByRole")
	public Map<String, Object> getPermissionsforRole(@RequestParam("roleId") int roleId, @RequestParam("parentId") int parentId) {
		List<Permission> permissions = new ArrayList<>();
		Map<String, Object> returnMap =  new HashMap<>();
		permissions.addAll(rolePermService.getPermissionByRole(roleId));
		returnMap.put("treeSize", permissions.size());
		returnMap.put("tree", rolePermService.getPermissionTreeView(permissions, roleId, rolePermService.getLoginUserRole().getId(), parentId));
		return returnMap; 
	}


	@GetMapping("getAllRolesForLoginUser")
	public Map<String, Object> getAllRelatedRoles() {
		List<Map<String, Object>> relatedRoles = new ArrayList<>();
		Map<String, Object> returnMap = new HashMap<>();
		relatedRoles.addAll(rolePermService.getAllRoles(returnMap));
		returnMap.put("relatedRoles", relatedRoles);
		return returnMap;
	}

	@GetMapping("getAllRolesList")
	public List<Role> getAllRolesList() {
		return rolePermService.getAllRoles();
	}

	@GetMapping(value = "saveRolePermissions")
	// @PreAuthorize("hasAuthority('CTRL_ACSSLVL_PERM_SAVE')")
	public String savePermissionsForRole(final HttpServletRequest request,
			@RequestParam(value = "permissions", required = false) List<Integer> permissionIds,
			@RequestParam(value = "roleId", required = false) int roleId) throws JSONException {
		JSONObject accessLevelObject = new JSONObject();
		List<Permission> permissions;
		if (permissionIds.size() != 0) {

			permissions = new ArrayList<Permission>(rolePermService.getSelectedPermissions(permissionIds));
		} else {
			permissions = new ArrayList<>();
		}
		Role role = null;
		try {
			role = rolePermService.getRoleById(roleId);
			role.setPermissions(permissions);
			rolePermService.addRole(role);
			accessLevelObject.put("isSaved", true);
		} catch (Exception e) {
			logger.error("Role not found", e);
			accessLevelObject.put("isSaved", false);
		}
		return accessLevelObject.toString();
	}

	@GetMapping(value = "checkRoleNameExist")
	public Map<String, Object> checkRoleNameExist(HttpServletRequest request,
			@RequestParam(value = "roleName", required = false, defaultValue = "") String roleName,
			@RequestParam(value = "roleId", required = false, defaultValue = "0") int roleId,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit) {
		Map<String, Object> returnMap = new HashMap<>();
		try {
			Role role = null;
			returnMap.put("success", false);
			if (isEdit && roleId != 0) {
				role = rolePermService.getRoleById(roleId);
				if (role.getRoleName().equals(roleName)) {
					return returnMap;
				}
			}

			if ((roleName != null)) {
				returnMap.put("success", rolePermService.isRoleNameAvailable(roleName));
			}

		} catch (Exception e) {
			returnMap.put("success", false);
		}
		return returnMap;

	}

	// @PreAuthorize("hasAuthority('CTRL_ROLE_ADD')")
	@PostMapping(value = "role/add")
	public Map<String, Object> addRolePost(@RequestBody Map<String, Object> roleObj) {

		Map<String, Object> returnMap = new HashMap<>();
		boolean isAdd = false;
		try {
			int roleId = 0;
			Role role = null;
			if (roleObj.get("id") == null) {
				// add
				isAdd = true;
				role = new Role();
				List<Permission> permissions = new ArrayList<>();
				List<Role> roleChildren = new ArrayList<>();
				role.setPermissions(permissions);
				role.setChildrenRoles(roleChildren);
			} else {
				// edit
				roleId = (int) roleObj.get("id");
				role = rolePermService.getRoleById(roleId);
			}

			int parentId = (int) roleObj.get("parentRole");
			String roleName = (String) roleObj.get("roleName");
			role.setId(roleId);
			role.setRoleName(roleName);
			int companyId=(Integer) roleObj.get("companyId");
			Company company=companyProfileService.getCompany(companyId);
            role.setCompany(company);
			if (isAdd) {
				rolePermService.saveParentRoleWithChild(parentId, role);
			} else {
				// check the old parent is different from new
				int oldParentId = (int) roleObj.get("oldParent");
				if (oldParentId != parentId) {
					/*
					 * if different, then remove child from old parent and add
					 * to new
					 */
					Role oldParent = rolePermService.getRoleById(oldParentId);
					oldParent.getChildrenRoles().remove(role);
					rolePermService.addRole(oldParent);
					rolePermService.saveParentRoleWithChild(parentId, role);
				} else {
					rolePermService.addRole(role);
				}
			}
			returnMap.put("success", true);
			returnMap.put("roleTree", rolePermService.getAllRoles(returnMap));
		} catch (Exception e) {
			logger.error("error: " + e);
			returnMap.put("success", false);
		}
		return returnMap;
	}

	@GetMapping("getRoleById")
	public Map<String, Object> getRoleById(@RequestParam("roleId") int roleId) {
		Map<String, Object> returnMap = new HashMap<>();
		Role role = rolePermService.getRoleById(roleId);
		returnMap.put("role", role);
		// returnMap.put("parentRole", role.getParentRole());
		return returnMap;
	}

	@DeleteMapping("deleteRoleById")
	public Map<String, Object> deleteRoleById(@RequestParam("roleId") int roleId,
			@RequestParam("parentId") int parentId) {
		Map<String, Object> returnMap = new HashMap<>();
		List<Role> children = new ArrayList<>();
		try {
			Role deletingRole = rolePermService.getRoleById(roleId);
			if (deletingRole.getChildrenRoles().isEmpty()){			
			Role parent = rolePermService.getRoleById(parentId);
			children.addAll(parent.getChildrenRoles());
			children.remove(rolePermService.getRoleById(roleId));
			parent.setChildrenRoles(children);
			rolePermService.addRole(parent);
			rolePermService.deleteRoleById(roleId);
			returnMap.put("success", true);
			returnMap.put("roleTree", rolePermService.getAllRoles(returnMap));
			}
			else{
			returnMap.put("success", false);	
			returnMap.put("errorMsg", "Contains Children");	
			}
		} catch (Exception e) {
			returnMap.put("success", false);
			logger.error("role deletion failed", e);
		}
		return returnMap;
	}

	@GetMapping("moveChildRole")
	public Map<String, Object> moveChildRole(@RequestParam("roleId") int roleId,
			@RequestParam("parentId") int parentId) {
		Map<String, Object> returnMap = new HashMap<>();
		try {
			Role role = rolePermService.getRoleById(roleId);
			// Role parentRole = rolePermService.getRoleById(parentId);
			// role.setParentRole(parentRole);
			rolePermService.addRole(role);
			returnMap.put("success", true);
		} catch (Exception e) {
			returnMap.put("success", false);
		}
		return returnMap;
	}
	@GetMapping(value = "checkPermission")
	public Map<String, Object> checkAcessibilityForRole(@RequestParam("id")int id){
        Map<String, Object> returnMap = new HashMap<>();
        if(id==1){
            returnMap.put("success",false);
        }
        else {
            returnMap.put("success",true);
        }
        return returnMap;
    }
    @GetMapping("getpermissionforloggeduser")
    public List<Permission> getPermissionByLoggedUser(){

        return rolePermService.getLoginUserRole().getPermissions();
    }


}
