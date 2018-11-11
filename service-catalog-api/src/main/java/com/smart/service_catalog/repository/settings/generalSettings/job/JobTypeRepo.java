package com.smart.service_catalog.repository.settings.generalSettings.job;

import com.smart.service_catalog.model.settings.generalSettings.jobType.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by CSI on 8/8/2017.
 */
@Repository
public interface JobTypeRepo extends JpaRepository<JobType,Integer>{

    public JobType findByName(String name);

}
