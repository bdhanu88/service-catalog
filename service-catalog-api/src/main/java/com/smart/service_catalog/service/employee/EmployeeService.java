package com.smart.service_catalog.service.employee;

import com.smart.service_catalog.model.employee.Employee;
import com.smart.service_catalog.model.employee.EmployeeType;

import java.util.List;
import java.util.Map;

public interface EmployeeService  {
	
	public Employee findByFirstName(String firstName);

    public Employee findByEmployeeId(String employeeId);

    public Employee findById(Long id);
    
    public Employee findByUserName(String username);
    
    public Employee save(Employee employee);

    public Map<String,Object> getDetails(int companyId);

    public EmployeeType addEmpType(EmployeeType employeeType);

    public List<EmployeeType> getAllEmpTypes();

    public EmployeeType getEmpTypeById(int id);

    public EmployeeType getEmployeeTypeByName(String empTypeName);

    public Employee addEmployeeProfile(Employee employeeProfile);

    public List<Employee> getAllEmployeeProfiles();

    public Employee getProfileById(Long id);

    public List<Employee> getAllEmpProfiles();

    public List<Employee> getAllActiveEmployees();

    public int deactivateEmployee(Long id);

    public List<Employee> getAllCustomers();

}
