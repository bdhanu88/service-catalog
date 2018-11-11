package com.smart.service_catalog.service.unit;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import com.smart.service_catalog.model.unit.Unit;

public interface UnitService {
	
	public List<Unit> getUnitListOrderByUnitLevelAndUnitId(int companyId) throws Exception;
	
	public Unit addUnit(Unit unit) throws Exception;
	
	public void deleteUnit(int id) throws Exception;
	
	public List<Unit> getUnitList(int companyId) throws Exception;
	
	public Unit getUnit(int id) throws Exception;
	
	public List<Map<String,Object>>getUnitTree(int companyId) throws Exception;
	
	public boolean isUnitNameExist(String unitName,int companyId)throws Exception;
	
	public boolean isAbbreviationExist(String abbreviation,int companyId)throws Exception;
	
	public List<Unit> getUnitsMappedToUnitLevel(UnitLevel unitLevel)throws Exception;
}
