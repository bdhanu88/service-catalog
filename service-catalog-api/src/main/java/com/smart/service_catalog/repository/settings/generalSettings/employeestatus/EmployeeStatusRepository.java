package com.smart.service_catalog.repository.settings.generalSettings.employeestatus;

import com.smart.service_catalog.model.settings.generalSettings.employeestatus.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeStatusRepository extends JpaRepository<EmployeeStatus, Integer> {
	
	public EmployeeStatus findByName(String name);
	
	public EmployeeStatus findByAbbreviation(String abbriviation);

}
