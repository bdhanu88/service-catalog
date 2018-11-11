package com.smart.service_catalog.service.impl.employee;

import com.smart.service_catalog.model.employee.EmployeeType;
import com.smart.service_catalog.repository.employee.EmployeeTypeRepo;
import com.smart.service_catalog.repository.unit.UnitRepo;
import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;
import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.employee.Employee;
import com.smart.service_catalog.repository.employee.EmployeeRepository;
import com.smart.service_catalog.service.employee.EmployeeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
//@PreAuthorize("denyAll")
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeTypeRepo employeeTypeRepo;

    @Autowired
    private UnitRepo unitRepo;



    @Autowired
    private RolePermissionService rolePermissionService;

    @Autowired
    private SkillService skillService;

	//@PreAuthorize("hasAuthority('GET_EMPLOYEE')")
	@Override
	public Employee findByFirstName(String firstName) {
		return employeeRepository.findByFirstName(firstName);
	}

	@Override
	public Employee findByEmployeeId(String employeeId) {
		return employeeRepository.findByEmployeeId(employeeId);
	}

	//@PreAuthorize("hasAuthority('SAVE_EMPLOYEE')")
	@Override
	public Employee findById(Long id) {
		return employeeRepository.findEmployeeById(id);
	}

	@Override
	public Employee save(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Employee findByUserName(String username) {
		return employeeRepository.findByUsername(username);
	}



    @Override
    public Map<String, Object> getDetails(int companyId) {
        Map<String,Object> retMap= new HashMap<String,Object>();
        retMap.put("genders", Employee.Gender.values());
        retMap.put("maritalStatus", Employee.MaritalStatus.values());
        retMap.put("empTypes", employeeTypeRepo.findAll());
        retMap.put("unitList", unitRepo.getAllUnitsForCompany(companyId));
        retMap.put("roleList",rolePermissionService.getLoginUserRole());
        retMap.put("skillTree",skillService.generateSkillTree(companyId));
        retMap.put("sysAccess",Employee.SystemAccess.values());
        return retMap;
    }

    @Override
    public EmployeeType addEmpType(EmployeeType employeeType) {
        return employeeTypeRepo.saveAndFlush(employeeType);
    }

    @Override
    public List<EmployeeType> getAllEmpTypes() {
        return employeeTypeRepo.findAll();
    }

    @Override
    public EmployeeType getEmpTypeById(int id) {
        return employeeTypeRepo.findById(id).get();
    }

    @Override
    public EmployeeType getEmployeeTypeByName(String empTypeName) {
        return employeeTypeRepo.findByName(empTypeName);
    }

    @Override
    public Employee addEmployeeProfile(Employee employeeProfile) {
        return employeeRepository.saveAndFlush(employeeProfile);
    }

    @Override
    public List<Employee> getAllEmployeeProfiles() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getProfileById(Long id) {
        return employeeRepository.findById(id).get();
    }

    @Override
    public List<Employee> getAllEmpProfiles() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> getAllActiveEmployees() {
        return employeeRepository.findByEnabledAndIsEmployee(true,true);
    }

    @Override
    public int deactivateEmployee(Long id) {
        return employeeRepository.deactivateEmployee(id);
    }

    public List<Employee> getAllCustomers(){
	    return employeeRepository.findByEnabledAndIsEmployee(true,false);
    }

}
