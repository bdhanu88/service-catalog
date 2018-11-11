package com.smart.service_catalog.model.auth;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "PERMISSION")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler" , "parentPermission"})
public class Permission implements GrantedAuthority {

	private static final long serialVersionUID = 3874900048102780060L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;

	@NotNull(message = "{error.permission.permissionname.null}")
	@NotEmpty(message = "{error.permission.permissionname.empty}")
	@Size(max = 50, message = "{permission.permissionname.role.max}")
	@Column(name = "PERMISSION_NAME", length = 50)
	private String permissionName;

	@ManyToOne
	@JoinColumn(name = "PARENT_PERMISSION_ID")
	// @JsonIgnoreProperties({"parentPermission"})
	private Permission parentPermission;

	@Transient
	private boolean checked;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPermissionName() {
		return permissionName;
	}

	public void setPermissionName(String permissionname) {
		this.permissionName = permissionname;
	}

	public Permission getParentPermission() {
		return parentPermission;
	}

	public void setParentPermission(Permission parentPermission) {
		this.parentPermission = parentPermission;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	@Override
	public String getAuthority() {
		return getPermissionName();
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
		Permission other = (Permission) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Permission [id=" + id + ", permissionName=" + permissionName
				+ ", checked=" + checked + "]";
	}

}