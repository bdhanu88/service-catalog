package com.smart.service_catalog.repository.location;

import java.util.List;

import com.smart.service_catalog.model.location.Location;
import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepo extends JpaRepository<Location, Integer> {

	@Query("Select lc from Location lc order by lc.locationLevel asc, lc.id asc")
	public List<Location> getLocationListOrderByLocationLevelAndLocationId();
	
	public Location findByName(@Param("name") String name);
	
	public Location findByAbbreviation(@Param("abbreviation") String abbreviation);
	
	@Query("Select lc from Location lc where lc.locationLevel = :locationLevel")
	public List<Location> getLocationsMappedToLocationLevel(@Param("locationLevel") LocationLevel locationLevel);
}
