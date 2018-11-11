package com.smart.service_catalog.service.settings.generalSettings.hierarchy;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import com.smart.service_catalog.repository.settings.generalSettings.hierarchy.UnitLevelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UnitLevelServiceImpl implements UnitLevelService {

	@Autowired
    UnitLevelRepo unitHierarchyRepo;
	
	
	@Override
	public List<UnitLevel> getUnitLevelList(int companyId) {
		// TODO Auto-generated method stub
		List<UnitLevel> units =  unitHierarchyRepo.getUnitLevelList(companyId);
		return units;
	}
	
	@Override
	public UnitLevel getUnitLevel(int id) {
		// TODO Auto-generated method stub
		return unitHierarchyRepo.findById(id).get();
	}
	
	@Override
    public boolean isUnitLevelNameAvailable(String unitLevelName,int companyId) {
        
        UnitLevel unitLevel = unitHierarchyRepo.findByName(unitLevelName,companyId);

        if (unitLevel != null) {
            return  true;
        }
        return false;
    }
	
	@Override
	public boolean isAbbreviationAvailable(String abbreviation,int companyId) {
		UnitLevel unitLevel = unitHierarchyRepo.findByAbbreviation(abbreviation,companyId);
		 if (unitLevel != null) {
	            return true;
	     }
		 return false;
	}

	@Override
	public UnitLevel addUnitLevel(UnitLevel unitLevel) {
		// TODO Auto-generated method stub
		return unitHierarchyRepo.save(unitLevel);
	}

	@Override
	public void deleteUnitLevel(int id) {
		
		unitHierarchyRepo.deleteById(id);
	}
	
	
}
