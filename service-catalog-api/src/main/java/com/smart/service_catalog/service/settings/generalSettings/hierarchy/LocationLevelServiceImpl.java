package com.smart.service_catalog.service.settings.generalSettings.hierarchy;

import java.util.List;

import javax.transaction.Transactional;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.repository.settings.generalSettings.hierarchy.LocationLevelRepo;

@Service
@Transactional
public class LocationLevelServiceImpl implements LocationLevelService{

	@Autowired
	LocationLevelRepo locationLevelRepo;
				
	@Override
	public List<LocationLevel> getLocationLevelList() {
		// TODO Auto-generated method stub
		return locationLevelRepo.getLocationLevelList();
	}

	@Override
	public LocationLevel getLocationLevel(int id) {
		// TODO Auto-generated method stub
		return locationLevelRepo.findById(id).get();
	}

	@Override
	public boolean isLocationLevelNameAvailable(String locationLevelName) {
		// TODO Auto-generated method stub
		  LocationLevel locationLevel = locationLevelRepo.findByName(locationLevelName);

	        if (locationLevel != null) {
	            return  true;
	        }
	      return false;
	}

	@Override
	public boolean isAbbreviationAvailable(String abbreviation) {
		// TODO Auto-generated method stub
		 LocationLevel locationLevel = locationLevelRepo.findByAbbreviation(abbreviation);
		 if (locationLevel != null) {
	            return true;
	     }
		 return false;
	}

	@Override
	public LocationLevel addLocationLevel(LocationLevel locationLevel) {
		// TODO Auto-generated method stub
		return locationLevelRepo.save(locationLevel);
	}

	@Override
	public void deleteLocationLevel(int id) {
		// TODO Auto-generated method stub
		locationLevelRepo.deleteById(id);
	}

}
