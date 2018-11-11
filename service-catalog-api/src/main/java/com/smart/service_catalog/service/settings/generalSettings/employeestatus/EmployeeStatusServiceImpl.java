package com.smart.service_catalog.service.settings.generalSettings.employeestatus;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.settings.generalSettings.employeestatus.EmployeeStatus;
import com.smart.service_catalog.repository.settings.generalSettings.employeestatus.EmployeeStatusRepository;

@Service
@Transactional
public class EmployeeStatusServiceImpl implements EmployeeStatusService {
	
	@Autowired
	private EmployeeStatusRepository employeeStatusRepository;

	@Override
	public boolean checkAvailibility(String value, boolean isName) {
		EmployeeStatus employeeStatus = null;
		boolean isExist = true;
		if (isName) {
			employeeStatus = employeeStatusRepository.findByName(value);
		} else {
			employeeStatus = employeeStatusRepository.findByAbbreviation(value);
		}

		if (employeeStatus == null) {
			isExist = false;
		}
		return isExist;
	}

	@Override
	public EmployeeStatus addEmployeeStatus(EmployeeStatus employeeStatus) {
		return employeeStatusRepository.saveAndFlush(employeeStatus);
	}

	@Override
	public List<EmployeeStatus> getAllEmployeeStatus() {
		return employeeStatusRepository.findAll();
	}

	@Override
	public boolean removeEmployeeStatus(int employeeStatusId) {
		boolean isSuccess = true;
		try{
			employeeStatusRepository.deleteById(employeeStatusId);
		}catch(Exception e){
			isSuccess = false;
		}
		return isSuccess;
	}

}
