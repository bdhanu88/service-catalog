package com.smart.service_catalog.repository.employee;

import com.smart.service_catalog.model.employee.EmployeeProfile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by CSI on 8/11/2017.
 */
public interface EmployeeProfileRepo extends JpaRepository<EmployeeProfile,Integer> {
}
