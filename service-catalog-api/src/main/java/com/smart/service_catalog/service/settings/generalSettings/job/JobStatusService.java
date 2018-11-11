package com.smart.service_catalog.service.settings.generalSettings.job;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.job.JobStatus;

public interface JobStatusService {
	
	public JobStatus addJobStatus(JobStatus jobStatus);
	
	public void deleteJobStatus(int jobStatusId);

	public List<JobStatus> getAllJobStates();
	
	public JobStatus getJobStatusById(int id);
	

}
