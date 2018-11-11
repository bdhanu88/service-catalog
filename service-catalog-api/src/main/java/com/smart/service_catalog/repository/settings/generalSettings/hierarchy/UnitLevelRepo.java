package com.smart.service_catalog.repository.settings.generalSettings.hierarchy;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("unitHierarchyRepository")
public interface UnitLevelRepo extends JpaRepository<UnitLevel, Integer>{

    @Query("select ul from UnitLevel ul where ul.company.id=:companyId and ul.name=:name")
	UnitLevel findByName(@Param("name") String name,@Param("companyId")int companyId);

    @Query("select ul from UnitLevel ul where ul.abbreviation=:abbreviation and ul.company.id=:companyId")
	UnitLevel findByAbbreviation(@Param("abbreviation")String abbreviation,@Param("companyId")int companyId);
	
	@Query("select ul from UnitLevel ul where ul.company.id=:companyId order by ul.id")
	List<UnitLevel> getUnitLevelList(@Param("companyId")int companyId);

}
