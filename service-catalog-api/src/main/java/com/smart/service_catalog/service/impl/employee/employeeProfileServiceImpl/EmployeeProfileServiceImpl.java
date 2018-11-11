package com.smart.service_catalog.service.impl.employee.employeeProfileServiceImpl;

import com.smart.service_catalog.model.employee.EmployeeProfile;
import com.smart.service_catalog.model.employee.EmployeeType;
import com.smart.service_catalog.repository.employee.EmployeeProfileRepo;
import com.smart.service_catalog.repository.employee.EmployeeRepository;
import com.smart.service_catalog.repository.employee.EmployeeTypeRepo;
import com.smart.service_catalog.repository.unit.UnitRepo;
import com.smart.service_catalog.service.employee.employeeProfile.EmployeeProfileService;
import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;
import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by CSI on 8/11/2017.
 */
@Service
public class EmployeeProfileServiceImpl implements EmployeeProfileService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeTypeRepo employeeTypeRepo;

    @Autowired
    private UnitRepo unitRepo;

    @Autowired
    private EmployeeProfileRepo  employeeProfileRepo;

    @Autowired
    private RolePermissionService rolePermissionService;

    @Autowired
    private SkillService skillService;

    @Override
    public Map<String, Object> getDetails(int companyId) {
        Map<String,Object> retMap= new HashMap<String,Object>();
        retMap.put("genders", EmployeeProfile.Gender.values());
        retMap.put("maritalStatus", EmployeeProfile.MaritalStatus.values());
        retMap.put("empTypes", employeeTypeRepo.findAll());
        retMap.put("unitList", unitRepo.getAllUnitsForCompany(companyId));
        rolePermissionService.getLoginUserRole();//to get logged user role - to be implemented
        retMap.put("roleList",rolePermissionService.getRoleById(1));
        retMap.put("skillTree",skillService.generateSkillTree(companyId));
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
    public EmployeeProfile addEmployeeProfile(EmployeeProfile employeeProfile) {
        return employeeProfileRepo.saveAndFlush(employeeProfile);
    }

    @Override
    public List<EmployeeProfile> getAllEmployeeProfiles() {
        return employeeProfileRepo.findAll();
    }

    @Override
    public EmployeeProfile getProfileById(int id) {
        return employeeProfileRepo.findById(id).get();
    }

    @Override
    public List<EmployeeProfile> getAllEmpProfiles() {
        return employeeProfileRepo.findAll();
    }


}
