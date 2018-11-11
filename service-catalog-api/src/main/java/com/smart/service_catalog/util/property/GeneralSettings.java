package com.smart.service_catalog.util.property;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value = "singleton")
@PropertySource("classpath:/Modules/General/generalSettings.properties")
public class GeneralSettings {

	@Value("#{'${general.weekDaysArray}'.split(',')}")
	private List<String> weekDaysArray;

	@Value("${general.orgnaizatinName}")
	private String organizationName;

	@Value("${general.regexPattern}")
	private String regexPattern;
	
	public List<String> getWeekDaysArray() {
		return weekDaysArray;
	}

	public void setWeekDaysArray(List<String> weekDaysArray) {
		this.weekDaysArray = weekDaysArray;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	
	public String getRegexPattern() {
		return regexPattern;
	}

	public void setRegexPattern(String regexPattern) {
		this.regexPattern = regexPattern;
	}
}
