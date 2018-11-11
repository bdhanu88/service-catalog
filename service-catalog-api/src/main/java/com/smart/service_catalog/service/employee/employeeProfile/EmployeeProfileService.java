package com.smart.service_catalog.service.employee.employeeProfile;

import com.smart.service_catalog.model.employee.EmployeeProfile;
import com.smart.service_catalog.model.employee.EmployeeType;

import java.util.List;
import java.util.Map;

/**
 * Created by CSI on 8/11/2017.
 */
public interface EmployeeProfileService  {

    public Map<String,Object> getDetails(int companyId);

    public EmployeeType addEmpType(EmployeeType employeeType);

    public List<EmployeeType> getAllEmpTypes();

    public EmployeeType getEmpTypeById(int id);

    public EmployeeProfile addEmployeeProfile(EmployeeProfile employeeProfile);

    public List<EmployeeProfile> getAllEmployeeProfiles();

    public EmployeeProfile getProfileById(int id);

    public List<EmployeeProfile> getAllEmpProfiles();
}
