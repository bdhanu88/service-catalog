package com.smart.service_catalog.repository.settings.generalSettings.hierarchy;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationLevelRepo extends JpaRepository<LocationLevel, Integer> {
	
    LocationLevel findByName(@Param("name") String name);
	
	LocationLevel findByAbbreviation(@Param("abbreviation")String abbreviation);
	
	@Query("select ll from LocationLevel ll order by ll.id")
	List<LocationLevel> getLocationLevelList();

}
