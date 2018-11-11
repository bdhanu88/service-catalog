package com.smart.service_catalog.repository.settings.generalSettings.skill;

import java.util.List;

import com.smart.service_catalog.model.settings.generalSettings.skill.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
	
	public Skill findByName(String name);
	
	public Skill findByAbbreviation(String abbreviation);
	
	public List<Skill> findBySkillGroup(SkillGroup skillGroup);

}
