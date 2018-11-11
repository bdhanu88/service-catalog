package com.smart.service_catalog.model.settings.generalSettings.employeestatus;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "EMPLOYEE_STATUS")
public class EmployeeStatus implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7954909071694411963L;

	public enum EmployeeStatusType{
        AVAILABLE("emp_available"),
        UNAVAILABLE("emp_unavailable");

        private String value;
        
        EmployeeStatusType(String value){
            this.setValue(value);
        }
        
        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
	
	@Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "ABBREVIATION")
	private String abbreviation;
	
	@Column(name = "EMPLOYEE_STATUS_TYPE")
	private EmployeeStatusType employeeStatusType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public EmployeeStatusType getEmployeeStatusType() {
		return employeeStatusType;
	}

	public void setEmployeeStatusType(EmployeeStatusType employeeStatusType) {
		this.employeeStatusType = employeeStatusType;
	}

}
