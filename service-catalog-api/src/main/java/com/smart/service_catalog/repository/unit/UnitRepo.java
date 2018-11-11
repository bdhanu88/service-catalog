package com.smart.service_catalog.repository.unit;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smart.service_catalog.model.unit.Unit;

@Repository
public interface UnitRepo extends JpaRepository<Unit, Integer> {

	@Query("select  u from Unit u where u.unitLevel.company.id=:companyId order by u.unitLevel asc, u.id asc")
	public List<Unit> getUnitListOrderByUnitLevelAndUnitId(@Param("companyId") int companyId);

    @Query("Select u from Unit u where u.unitLevel.company.id = :companyId and u.name=:name")
	public Unit findByName(@Param("name") String name,@Param("companyId") int companyId);

    @Query("Select u from Unit u where u.unitLevel.company.id = :companyId and u.abbreviation=:abbreviation")
	public Unit findByAbbreviation(@Param("abbreviation") String abbreviation,@Param("companyId") int companyId);
	
	@Query("Select u from Unit u where u.unitLevel = :unitLevel")
	public List<Unit> getUnitsMappedToUnitLevel(@Param("unitLevel") UnitLevel unitLevel);

	@Query("Select u from Unit u where u.unitLevel.company.id = :companyId")
    public List<Unit> getAllUnits(int companyId);

	@Query("select u from Unit as u where u.parentUnit is not null and u.unitLevel.company.id=:companyId")
    public List<Unit> getAllUnitsForCompany(@Param("companyId")int companyId);
}
