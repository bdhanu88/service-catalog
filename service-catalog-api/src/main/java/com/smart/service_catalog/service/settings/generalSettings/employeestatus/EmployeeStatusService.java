package com.smart.service_catalog.service.settings.generalSettings.employeestatus;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.employeestatus.EmployeeStatus;

public interface EmployeeStatusService {
	
	public boolean checkAvailibility(String value , boolean isName);

	public EmployeeStatus addEmployeeStatus(EmployeeStatus employeeStatus);

	public List<EmployeeStatus> getAllEmployeeStatus();

	public boolean removeEmployeeStatus(int employeeStatusId);

}
