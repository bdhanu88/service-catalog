package com.smart.service_catalog.service.unit;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import com.smart.service_catalog.repository.unit.UnitRepo;
import com.smart.service_catalog.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smart.service_catalog.model.unit.Unit;

@Service
@Transactional
public class UnitServiceImpl implements UnitService {
	
	@Autowired
    UnitRepo unitRepo;
	
	@Override
	public List<Unit> getUnitListOrderByUnitLevelAndUnitId(int companyId) throws Exception {
		// TODO Auto-generated method stub
		return unitRepo.getUnitListOrderByUnitLevelAndUnitId(companyId);
	}

	@Override
	public Unit addUnit(Unit unit) throws Exception{
		// TODO Auto-generated method stub
		return unitRepo.save(unit);
	}

	@Override
	public void deleteUnit(int id) throws Exception{
		unitRepo.deleteById(id);
		
	}

	@Override
	public List<Unit> getUnitList(int companyId) throws Exception {
		// TODO Auto-generated method stub
		return unitRepo.getAllUnits(companyId);
	}

	@Override
	public Unit getUnit(int id) throws Exception {
		// TODO Auto-generated method stub
		return unitRepo.findById(id).get();
	}

	@Override
	public List<Map<String, Object>> getUnitTree(int companyId) throws Exception {
		// TODO Auto-generated method stub
		return CommonUtil.generateMapUnitTree(getUnitListOrderByUnitLevelAndUnitId(companyId));
	}

	@Override
	public boolean isUnitNameExist(String unitName,int companyId) throws Exception {
		Unit unit = unitRepo.findByName(unitName,companyId);
		if(unit != null){
			return true;
		}
		return false;
	}

	@Override
	public boolean isAbbreviationExist(String abbreviation,int companyId)throws Exception {
		// TODO Auto-generated method stub
		Unit unit = unitRepo.findByAbbreviation(abbreviation,companyId);
		if(unit != null){
			return true;
		}
		return false;
	}

	@Override
	public List<Unit> getUnitsMappedToUnitLevel(UnitLevel unitLevel) throws Exception {
		// TODO Auto-generated method stub
		return unitRepo.getUnitsMappedToUnitLevel(unitLevel);
	}

	
	
}
