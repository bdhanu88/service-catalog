package com.smart.service_catalog.repository.settings.generalSettings.skill;

import com.smart.service_catalog.model.settings.generalSettings.skill.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillGroupRepository  extends JpaRepository<SkillGroup, Integer> {
	
	public SkillGroup findByName(String name);
	
	public SkillGroup findByAbbreviation(String abbreviation);

	public List<SkillGroup> findByCompany_Id(int companyId);

}
