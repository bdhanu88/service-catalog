package com.smart.service_catalog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smart.service_catalog.model.settings.generalSettings.employeestatus.EmployeeStatus;
import com.smart.service_catalog.model.settings.generalSettings.employeestatus.EmployeeStatus.EmployeeStatusType;
import com.smart.service_catalog.service.settings.generalSettings.employeestatus.EmployeeStatusService;

@RestController
@RequestMapping("employeeStatusConfig")
public class EmployeeStatusConfigController {
	
	@Autowired
	private EmployeeStatusService employeeStatusService;
	
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "getEmployeeStatusType", method = RequestMethod.GET)
	public EmployeeStatusType[] getEmployeeStatusType() {
		return EmployeeStatusType.values() ;
	}

	@PreAuthorize("hasAuthority('EMPLOYEE_STATUS_VIEW')")
	@RequestMapping(value = "getAllEmployeeStatus", method = RequestMethod.GET)
	public Map<String, Object> getAllEmployeeStatus() {
		
		Map<String, Object> returnMap = new HashMap<>();
		try {
			returnMap.put("employeeStatus", employeeStatusService.getAllEmployeeStatus());
			returnMap.put("isSuccess", true);
		} catch (Exception e) {
			returnMap.put("isSuccess", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkExist", method = RequestMethod.GET)
	public Map<String, Object> checkAvailibility(
			@RequestParam(value = "value", required = false, defaultValue = "") String value,
			@RequestParam(value = "isName", required = false, defaultValue = "true") boolean isName ) {
		Map<String, Object> returnMap = new HashMap<>();

		boolean isExist = false;
		try {
			if (value.trim().length() > 0) {
				isExist = employeeStatusService.checkAvailibility(value.trim(), isName);
			}
			returnMap.put("success", isExist);
		} catch (Exception e) {
			returnMap.put("success", isExist);
		}
		return returnMap;

	}
	@PreAuthorize("hasAuthority('EMPLOYEE_STATUS_EDIT')")
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Map<String, Object> addSkillPost(@RequestBody EmployeeStatus employeeStatus) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		try {
			employeeStatusService.addEmployeeStatus(employeeStatus);
			returnMap.put("isSuccess", true);
		} catch (Exception e) {
			returnMap.put("isSuccess", false);
		}

		returnMap.put("employeeStatus", employeeStatusService.getAllEmployeeStatus());
		return returnMap;
	}

    @PreAuthorize("hasAuthority('EMPLOYEE_STATUS_EDIT')")
	@RequestMapping(value = "removeEmployeeStatus", method = RequestMethod.GET)
	public Map<String, Object> removeSkillGroup(@RequestParam(value = "id") int employeeStatusId 
	
			) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("isSuccess", employeeStatusService.removeEmployeeStatus(employeeStatusId));
		returnMap.put("employeeStatus", employeeStatusService.getAllEmployeeStatus());

		return returnMap;
	}

}
