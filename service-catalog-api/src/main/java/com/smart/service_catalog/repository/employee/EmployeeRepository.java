package com.smart.service_catalog.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.smart.service_catalog.model.employee.Employee;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource
@Transactional
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("select em from Employee em where em.id = :id")
	public Employee findEmployeeById(@Param("id") Long id);

	public Employee findByFirstName(String firstName);

	public Employee findByEmployeeId(String employeeId);
	
	public Employee findByUsername(String userName);

	public List<Employee> findByEnabledAndIsEmployee(boolean isActive,boolean isEmployee);

	@Modifying
	@Query("update Employee e set e.enabled=false where e.id=:empId")
	public int deactivateEmployee(@Param("empId") Long empId);
}
