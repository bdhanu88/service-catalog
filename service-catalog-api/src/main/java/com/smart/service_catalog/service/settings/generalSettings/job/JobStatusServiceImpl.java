package com.smart.service_catalog.service.settings.generalSettings.job;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.job.JobStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.repository.settings.generalSettings.job.JobStatusRepo;

@Service
public class JobStatusServiceImpl implements JobStatusService {

	@Autowired
	JobStatusRepo jobStatusRepo;

	@Override
	public JobStatus addJobStatus(JobStatus jobStatus) {
		return jobStatusRepo.save(jobStatus);
	}

	@Override
	public void deleteJobStatus(int jobStatusId) {
		jobStatusRepo.deleteById(jobStatusId);
	}

	@Override
	public List<JobStatus> getAllJobStates() {
		return jobStatusRepo.findAll();
	}

	@Override
	public JobStatus getJobStatusById(int id) {
		return jobStatusRepo.findById(id).get();
	}

}
