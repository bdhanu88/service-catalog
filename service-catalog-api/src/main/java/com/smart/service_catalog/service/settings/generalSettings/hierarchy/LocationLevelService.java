package com.smart.service_catalog.service.settings.generalSettings.hierarchy;
import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import org.springframework.stereotype.Service;

@Service
public interface LocationLevelService {
	
	public List<LocationLevel> getLocationLevelList();
	
	public LocationLevel getLocationLevel(int id);
	
	public boolean isLocationLevelNameAvailable(String LocationLevelName);
	
	public boolean isAbbreviationAvailable(String abbreviation);
	
	public LocationLevel addLocationLevel(LocationLevel locationLevel);
	
	public void deleteLocationLevel(int id);
}
