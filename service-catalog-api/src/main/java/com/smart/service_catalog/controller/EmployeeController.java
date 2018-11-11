package com.smart.service_catalog.controller;

import com.smart.service_catalog.model.auth.Role;
import com.smart.service_catalog.model.employee.Employee;
import com.smart.service_catalog.model.employee.EmployeeType;
import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;
import com.smart.service_catalog.model.unit.Unit;
import com.smart.service_catalog.service.employee.EmployeeService;
import com.smart.service_catalog.service.settings.generalSettings.accessLevel.RolePermissionService;
import com.smart.service_catalog.service.settings.generalSettings.category.GradeService;
import com.smart.service_catalog.service.settings.generalSettings.hierarchy.UnitLevelService;
import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import com.smart.service_catalog.service.unit.UnitService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

	private static Logger logger = LogManager.getLogger();

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private UnitLevelService unitLevelService;

    @Autowired
    private RolePermissionService rolePermissionService;

	@RequestMapping(value = "save", method = RequestMethod.GET)
	public Employee employeeSave(@ModelAttribute("employee") Employee employee) {
		employee.setFirstName("Buddhi");
		employee.setEmployeeId("EMP-001");
		employeeService.save(employee);
		return employee;
	}

	@PreAuthorize("hasAuthority('EMPLOYEE_PROFILE_VIEW')")
	@RequestMapping(value = "getemployee", method = RequestMethod.GET)
	public Employee getEmployeeById(@RequestParam("employeeId") long employeeId) {
		logger.info("Test Log : test");
		return employeeService.findById(employeeId);
		// return new Employee();
	}
    @GetMapping(value = "getdetails")
    public Map<String,Object> empProfileHome(@RequestParam(value = "companyId",defaultValue = "1")int companyId){
        return employeeService.getDetails(companyId);
    }
    @PreAuthorize("hasAuthority('EMPLOYEE_TYPE_EDIT')")
    @PostMapping(value = "addemptype")
    public Map<String,Object> addEmployeeType(@RequestBody EmployeeType employeeType){
        Map<String,Object> retEmpTypeMap=new HashMap<String,Object>();
        try {
            employeeService.addEmpType(employeeType);
            retEmpTypeMap.put("empTypes",employeeService.getAllEmpTypes());
            retEmpTypeMap.put("success",true);
        }catch (Exception e){
            logger.error("error in add employee type",e);
            retEmpTypeMap.put("success",false);
        }
        return  retEmpTypeMap;
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_TYPE_VIEW')")
    @GetMapping(value = "getallemptypes")
    public Map<String,Object> getAllEmpTypes(){
        Map<String,Object> retEmpTypeMap=new HashMap<String,Object>();
        retEmpTypeMap.put("empTypes",employeeService.getAllEmpTypes());
        return retEmpTypeMap;
    }
    @GetMapping(value = "checkemptypename")
    public Map<String,Object> checkEmpTypeName(@RequestParam("value")String empTypeName ){
        Map<String,Object> retMap=new HashMap<String,Object>();
        EmployeeType employeeType=new EmployeeType();
        if(empTypeName.trim().length()>0){
            employeeType= employeeService.getEmployeeTypeByName(empTypeName);
        }
        if(employeeType != null){
            retMap.put("success",true);
        }

        else {
            retMap.put("success",false);
        }
        return retMap;
    }


    @PreAuthorize("hasAuthority('EMPLOYEE_PROFILE_EDIT')")
    @PostMapping(value = "addempprofile")
    public Map<String,Object> addemployee(@RequestBody Employee employee){

        Map<String,Object> retMap=new HashMap<String,Object>();
        try {
            if(employee.getPassword()==null){
                Long empId=employee.getId();
                employee.setPassword(employeeService.getProfileById(empId).getPassword());
                employee.setUsername(employeeService.getProfileById(empId).getUsername());
            }
            else {
                employee.setPassword(this.encryptPassword(employee.getPassword()));
            }
            employee.setIsEmployee(true);
            employee.setEmployeeType(employeeService.getEmpTypeById(employee.getEmployeeType().getId()));
            employee.setGrade(gradeService.getGrade(employee.getGrade().getId()));
            Unit unit=unitService.getUnit(employee.getUnit().getId());
            unit.setParentUnit(unitService.getUnit(unit.getParentUnit().getId()));
            unit.setUnitLevel(unitLevelService.getUnitLevel(unit.getUnitLevel().getId()));
            employee.setUnit(unit);
            employee.setEnabled(true);
            employee.setFirstName(employee.getName());
            employee.setLastname(employee.getName());
            List<Skill> skillList=new ArrayList<Skill>();
            for (Skill skill:employee.getSkills()) {
                skillList.add(skillService.getSkillById(skill.getId()));
            }
            List<Unit> unitAccessList=new ArrayList<Unit>();
            for (Unit unitAccess:employee.getUnitAccess()) {
                unitAccessList.add(unitService.getUnit(unitAccess.getId()));
            }
            employee.setSkills(skillList);
            employee.setUnitAccess(unitAccessList);
            employeeService.addEmployeeProfile(employee);
            retMap.put("success",true);
            retMap.put("empProfileList",employeeService.getAllEmployeeProfiles());

        }catch (Exception e){
            logger.error("error in add employee profile",e);
            retMap.put("success",false);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_PROFILE_VIEW')")
    @GetMapping(value = "getempprofiledetail")
    public Map<String,Object> getEmpProfDetailsyId(@RequestParam("id")Long id){
        Map<String,Object> retMap=new HashMap<String,Object>();
        try {
            retMap.put("profile",employeeService.getProfileById(id));
            retMap.put("success",true);
        }catch (Exception e){
            logger.error("error in get employee profile",e);
            retMap.put("success",false);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_PROFILE_VIEW')")
    @GetMapping(value = "getallempprofiles")
    public Map<String,Object> getAllEmpProfiles(){
        Map<String,Object> retMap=new HashMap<String,Object>();
        try {
            retMap.put("profileList",employeeService.getAllActiveEmployees());
            retMap.put("success",true);
        }catch (Exception e){
            logger.error("error in get employee profile",e);
            retMap.put("success",false);
        }
        return retMap;
    }

    @GetMapping(value = "checkusername")
    public Map<String,Object> checkUserName(@RequestParam("value")String userName ){
        Map<String,Object> retMap=new HashMap<String,Object>();
        Employee employee=new Employee();
        if(userName.trim().length()>0){
            employee= employeeService.findByUserName(userName);
        }
        if(employee != null){
            retMap.put("success",true);
        }

        else {
            retMap.put("success",false);
        }
        return retMap;
    }

    @GetMapping(value = "checkempid")
    public Map<String,Object> checkEmployeeId(@RequestParam("value")String empId ){
        Map<String,Object> retMap=new HashMap<String,Object>();
        Employee employee=new Employee();
        if(empId.trim().length()>0){
            employee= employeeService.findByEmployeeId(empId);
        }
        if(employee != null){
            retMap.put("success",true);
        }

        else {
            retMap.put("success",false);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_PROFILE_EDIT')")
    @GetMapping(value = "deactivateEmployee")
    public Map<String,Object> deactivateEmployee(@RequestParam("id")Long empId,@RequestParam("isCustomer")boolean isCustomer ){
        Map<String,Object> retMap=new HashMap<String,Object>();
        int retVal=employeeService.deactivateEmployee(empId);
        if(retVal ==1){
            retMap.put("success",true);
            if(isCustomer){
                retMap.put("profileList",employeeService.getAllCustomers());
            }
            else {
                retMap.put("profileList",employeeService.getAllActiveEmployees());
            }
        }
        else {
            retMap.put("success",false);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('CUSTOMER_PROFILE_EDIT')")
    @PostMapping(value = "addcustomer")
    public Map<String,Object> addCustomer(@RequestBody Employee employee){
        Map<String,Object> retMap=new HashMap<String,Object>();
        try {
            if(employee.getPassword()==null){
                Long empId=employee.getId();
                employee.setPassword(employeeService.getProfileById(empId).getPassword());
                employee.setUsername(employeeService.getProfileById(empId).getUsername());
            }
            else {
                employee.setPassword(this.encryptPassword(employee.getPassword()));
            }
            Role loginUserRole= rolePermissionService.getLoginUserRole();
            employee.setIsEmployee(false);
            employee.setEnabled(true);
            retMap.put("success",true);
            retMap.put("profileList",employeeService.getAllCustomers());
//        employeeService.addEmployeeProfile(employee);
        }catch (Exception e){
            logger.error("error add customer",e);
            retMap.put("success",false);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('CUSTOMER_PROFILE_VIEW')")
    @GetMapping(value = "getallcustomers")
    public Map<String,Object> getAllCustomers(){
        Map<String,Object> retMap=new HashMap<String,Object>();
        try {
            retMap.put("profileList",employeeService.getAllCustomers());
            retMap.put("success",true);
        }catch (Exception e){
            logger.error("error in get employee profile",e);
            retMap.put("success",false);
        }
        return retMap;
    }

    private static String encryptPassword(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        password = passwordEncoder.encode(password);
        return password;
    }

}
