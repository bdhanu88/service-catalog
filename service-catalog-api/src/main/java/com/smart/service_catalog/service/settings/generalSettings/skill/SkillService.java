package com.smart.service_catalog.service.settings.generalSettings.skill;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;
import com.smart.service_catalog.model.settings.generalSettings.skill.SkillGroup;

public interface SkillService {
	
	public Skill addSkill(Skill skill) throws Exception;
	
	public SkillGroup getSkillGroup(int skillGroupId) throws Exception;
	
	public boolean removeSkillGroup(int skillGroupId);
	
	public SkillGroup addSkillGroup(SkillGroup skillGroup) throws Exception;

	public List<SkillGroup> getAllSkillGroup();
	
	public Map<String, Object> generateSkillTree(int companyId);
	
	public boolean checkAvailibility(String value , boolean isName, boolean isSkillGroup);
	
	public Skill getSkillById(int skillId) throws Exception;
	
	public boolean removeSkill(int skillId);
	
	public List<Skill> getSkillsInSkillGroup(SkillGroup skillGroup);

	public List<SkillGroup> getAllSkillGroupByComapny(int companyId);
	
}
