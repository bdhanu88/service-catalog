package com.smart.service_catalog.service.location;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.location.Location;
import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import com.smart.service_catalog.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smart.service_catalog.repository.location.LocationRepo;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

	@Autowired
	LocationRepo locationRepo;
	
	@Override
	public List<Location> getLocationListOrderByLocationLevelAndLocationId() throws Exception {
		// TODO Auto-generated method stub
		return locationRepo.getLocationListOrderByLocationLevelAndLocationId();
	}

	@Override
	public Location addLocation(Location location) throws Exception {
		// TODO Auto-generated method stub
		return locationRepo.save(location);
	}

	@Override
	public void deleteLocation(int id) throws Exception {
		locationRepo.deleteById(id);
		
	}

	@Override
	public List<Location> getLocationList() throws Exception {
		// TODO Auto-generated method stub
		return locationRepo.findAll();
	}

	@Override
	public Location getLocation(int id) throws Exception {
		// TODO Auto-generated method stub
		return locationRepo.findById(id).get();
	}

	@Override
	public List<Map<String, Object>> getLocationTree() throws Exception {
		// TODO Auto-generated method stub
		return CommonUtil.generateMapLocationTree(getLocationListOrderByLocationLevelAndLocationId());
	}

	@Override
	public boolean isLocationNameExist(String locationName) throws Exception {
		// TODO Auto-generated method stub
		Location location = locationRepo.findByName(locationName);
		if(location != null){
			return true;
		}
		return false;
	}

	@Override
	public boolean isAbbreviationExist(String abbreviation) throws Exception {
		// TODO Auto-generated method stub
		Location location = locationRepo.findByAbbreviation(abbreviation);
		if(location != null){
			return true;
		}
		return false;
	}

	@Override
	public List<Location> getLocationsMappedToLocationLevel(LocationLevel locationLevel) throws Exception {
		// TODO Auto-generated method stub
		return locationRepo.getLocationsMappedToLocationLevel(locationLevel);
	}

}
