package com.smart.service_catalog.repository.rolePermission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.smart.service_catalog.model.auth.Permission;

@RepositoryRestResource
public interface PermissionRepository extends JpaRepository<Permission, Integer>{
	
    /**
     * Finds a list permissions in given Id's.
     * 
     * @param permissionsIds
     *            Array of permission Id's.
     * @return Set of permissions objects for given array.
     */
    @Query("SELECT p FROM Permission p WHERE p.id in :permissionsIds")
    public List<Permission> findSpecificListOfPermissions(@Param("permissionsIds") List<Integer> permissions);

}
