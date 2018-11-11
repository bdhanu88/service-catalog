package com.smart.service_catalog.repository.rolePermission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.smart.service_catalog.model.auth.Role;

@RepositoryRestResource
public interface RoleRepository extends JpaRepository<Role, Integer> {

	Role findByRoleName(String rolename);
/*	   
    @Query("SELECT role_id from ROLE_CHILDREN_ROLES r where r.child_id:= childId")
    public Role getParentRoleByChild(int childId);*/
}
