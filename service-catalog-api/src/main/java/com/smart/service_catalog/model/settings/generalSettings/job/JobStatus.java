package com.smart.service_catalog.model.settings.generalSettings.job;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "JOB_STATUS")
public class JobStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;

	@Column(name = "JOB_STATUS_NAME")
	private String jobStatusName;

	@Column(name = "ABBREVIATION")
	private String abbreviation;
	
	@Column(name = "JOB_STATUS_TYPE")
	private JOB_STATUS_TYPES jobStatusType;

//	public enum JOB_STATUS_TYPES {
//		ON_ROUTE(1),
//		ONE (2),
//		TWO (3);
//		
//		private int val;
//
//	    private JOB_STATUS_TYPES(int val) {
//	        this.val = val;
//	    }
//	}
	
	public enum JOB_STATUS_TYPES {
		ON_ROUTE("1"),
		ONE ("2"),
		TWO("3");
        private String value;

        JOB_STATUS_TYPES(String value){
            this.setValue(value);
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
	
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getJobStatusName() {
		return jobStatusName;
	}

	public void setJobStatusName(String jobStatusName) {
		this.jobStatusName = jobStatusName;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}	

	public JOB_STATUS_TYPES getJobStatusType() {
		return jobStatusType;
	}

	public void setJobStatusType(JOB_STATUS_TYPES jobStatusType) {
		this.jobStatusType = jobStatusType;
	}

	@Override
	public String toString() {
		return "JobStatus [id=" + id + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		JobStatus other = (JobStatus) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
