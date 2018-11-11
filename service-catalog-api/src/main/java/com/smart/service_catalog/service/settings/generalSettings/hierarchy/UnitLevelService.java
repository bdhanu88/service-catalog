package com.smart.service_catalog.service.settings.generalSettings.hierarchy;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;

@Service
public interface UnitLevelService {
	
	public List<UnitLevel> getUnitLevelList(int companyId);
	
	public UnitLevel getUnitLevel(int id);
	
	public boolean isUnitLevelNameAvailable(String unitLevelName,int companyId);
	
	public boolean isAbbreviationAvailable(String abbreviation,int companyId);
	
	public UnitLevel addUnitLevel(UnitLevel unitLevel);
	
	public void deleteUnitLevel(int id);
}
