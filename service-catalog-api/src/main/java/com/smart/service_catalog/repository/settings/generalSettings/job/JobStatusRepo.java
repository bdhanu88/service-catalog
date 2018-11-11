package com.smart.service_catalog.repository.settings.generalSettings.job;

import com.smart.service_catalog.model.settings.generalSettings.job.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStatusRepo extends JpaRepository<JobStatus, Integer>{

}
