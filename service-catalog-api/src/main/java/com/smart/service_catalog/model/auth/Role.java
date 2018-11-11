package com.smart.service_catalog.model.auth;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.smart.service_catalog.model.company.Company;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ROLE")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Role implements GrantedAuthority {

	private static final long serialVersionUID = -8762124411493740920L;

	/**
	 * 
	 */
	public Role() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;

	/*
	 * CREATE TABLE `ROLES` ( `ID` INT(6) NOT NULL, `ROLENAME` VARCHAR(50) NOT
	 * NULL, PRIMARY KEY (`ID`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	 */
	@NotNull(message = "{error.roles.role.null}")
	@NotEmpty(message = "{error.roles.role.empty}")
	@Size(max = 50, message = "{error.roles.role.max}")
	@Column(name = "ROLE_NAME", length = 50)
	private String roleName;

	/*
	 * @ManyToOne(fetch = FetchType.LAZY)
	 * 
	 * @JoinColumn(name = "PARENT_ROLE_ID") //@JsonIgnoreProperties({
	 * "hibernateLazyInitializer", "handler" }) private Role parentRole;
	 */

	@OneToMany(fetch = FetchType.LAZY, cascade =  CascadeType.ALL)
	@JoinTable(name = "ROLE_CHILDREN_ROLES", joinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "id"), inverseJoinColumns = {
			@JoinColumn(name = "CHILD_ID", referencedColumnName = "id") })
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private List<Role> childrenRoles;

	@ManyToMany(fetch = FetchType.LAZY, targetEntity = Permission.class)
	@JoinTable(name = "ROLE_PERMISSION", joinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "id"), inverseJoinColumns = {
			@JoinColumn(name = "PERMISSION_ID", referencedColumnName = "id") })
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private List<Permission> permissions;

	@ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String rolename) {
		this.roleName = rolename;
	}

	/*
	 * public Role getParentRole() { return parentRole; }
	 * 
	 * public void setParentRole(Role parentRole) { this.parentRole =
	 * parentRole; }
	 */
	public List<Role> getChildrenRoles() {
		return childrenRoles;
	}

	public void setChildrenRoles(List<Role> childrenRoles) {
		this.childrenRoles = childrenRoles;
	}

	@JsonIgnore
	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	@Override
	public String toString() {
		return "Roles [rolename=" + roleName + ", permissions=" + permissions + ", getId()=" + getId() + ", getClass()="
				+ getClass() + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Role other = (Role) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String getAuthority() {
		return getRoleName();
	}


    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
