package com.smart.service_catalog.service.location;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.location.Location;
import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;

public interface LocationService {

	public List<Location> getLocationListOrderByLocationLevelAndLocationId() throws Exception;
	
	public Location addLocation(Location location) throws Exception;
	
	public void deleteLocation(int id) throws Exception;
	
	public List<Location> getLocationList() throws Exception;
	
	public Location getLocation(int id) throws Exception;
	
	public List<Map<String,Object>>getLocationTree() throws Exception;
	
	public boolean isLocationNameExist(String locationName)throws Exception;
	
	public boolean isAbbreviationExist(String abbreviation)throws Exception;
	
	public List<Location> getLocationsMappedToLocationLevel(LocationLevel locationLevel)throws Exception;
}
