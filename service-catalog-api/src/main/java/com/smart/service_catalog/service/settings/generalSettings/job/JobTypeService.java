package com.smart.service_catalog.service.settings.generalSettings.job;

import com.smart.service_catalog.model.settings.generalSettings.jobType.JobType;

import java.util.List;

/**
 * Created by CSI on 8/8/2017.
 */
public interface JobTypeService {

    public JobType addJobType(JobType jobType);

    public List<JobType> getAllJobTypes();

    public JobType getJobTypeById(int id);

    public List<JobType> removeJobType(int id);

    public JobType getJobTypeByName(String name);
}
