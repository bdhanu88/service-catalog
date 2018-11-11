package com.smart.service_catalog.service.settings.generalSettings.job;

import com.smart.service_catalog.model.settings.generalSettings.jobType.JobType;
import com.smart.service_catalog.repository.settings.generalSettings.job.JobTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by CSI on 8/8/2017.
 */
@Service
public class JobTypeServiceImpl implements JobTypeService{

    @Autowired
    private JobTypeRepo jobTypeRepo;
    @Override
    public JobType addJobType(JobType jobType){
        return jobTypeRepo.saveAndFlush(jobType);
    }

    @Override
    public List<JobType> getAllJobTypes() {
        return jobTypeRepo.findAll();
    }

    @Override
    public JobType getJobTypeById(int id) {
        return jobTypeRepo.findById(id).get();
    }

    @Override
    public List<JobType> removeJobType(int id) {
        jobTypeRepo.deleteById(id);
        return jobTypeRepo.findAll();
    }

    @Override
    public JobType getJobTypeByName(String name) {
        return jobTypeRepo.findByName(name);
    }
}
