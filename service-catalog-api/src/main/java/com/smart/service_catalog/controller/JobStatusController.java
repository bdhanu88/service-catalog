package com.smart.service_catalog.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smart.service_catalog.model.settings.generalSettings.job.JobStatus;
import com.smart.service_catalog.service.settings.generalSettings.job.JobStatusService;

@RestController
@RequestMapping("jobStatus")
public class JobStatusController {

	private static Logger logger = LogManager.getLogger();

	@Autowired
	JobStatusService jobStatusService;

	@PreAuthorize("hasAuthority('JOB_STATUS_VIEW')")
	@GetMapping(value = "getAllJobStates")
	public List<JobStatus> getAllJobStates() {
		List<JobStatus> jobStatus = new ArrayList<>();
		try {
			jobStatus = jobStatusService.getAllJobStates();
		} catch (Exception e) {
			logger.info(e);
		}
		return jobStatus;
	}
    @PreAuthorize("hasAuthority('JOB_STATUS_EDIT')")
	@PostMapping(value = "addJobState")
	public List<JobStatus> addJobState(@RequestBody JobStatus jobStatusForm){
		List<JobStatus> jobStatus = new ArrayList<>();
		try {
			JobStatus js = null;
			/*int jonStId = (int) jobStatusForm.get("id");
			if(jonStId  != 0 ){
				js = jobStatusService.getJobStatusById(jonStId);				
			}
			else{
				js = new JobStatus();
			}
			js.setJobStatusName((String) jobStatusForm.get("name"));
			js.setAbbreviation((String) jobStatusForm.get("abbreviation"));
			int typeId = Integer.parseInt((String) jobStatusForm.get("jobStatusType"));
			//in the front end we set first element as zero
			js.setJobStatusType(JOB_STATUS_TYPES.values()[typeId - 1]);*/
			jobStatusService.addJobStatus(jobStatusForm);
			jobStatus = jobStatusService.getAllJobStates();
			
		} catch (Exception e) {
			logger.info(e);
		}
		return jobStatus;
	}
    @PreAuthorize("hasAuthority('JOB_STATUS_EDIT')")
	@GetMapping("deleteJobStatus")
	public List<JobStatus> deleteJobStatus(@RequestParam("jobStatusId")int id){
		List<JobStatus> jobStatus = new ArrayList<>();
		jobStatusService.deleteJobStatus(id);
		jobStatus = jobStatusService.getAllJobStates();		
		return jobStatus;
	}
	

}
