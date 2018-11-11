package com.smart.service_catalog.service.impl.settings.generalSettings.skill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.smart.service_catalog.service.settings.generalSettings.company.CompanyProfileService;
import com.smart.service_catalog.model.settings.generalSettings.skill.SkillGroup;
import com.smart.service_catalog.repository.settings.generalSettings.skill.SkillGroupRepository;
import com.smart.service_catalog.repository.settings.generalSettings.skill.SkillRepository;
import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import com.smart.service_catalog.util.property.GeneralSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;

@Service
public class SkillServiceImpl implements SkillService {

	@Autowired
	private SkillGroupRepository skillGroupRepository;
	
	@Autowired
	private SkillRepository skillRepository;

	@Autowired
	private GeneralSettings generalSettings;

	@Autowired
    private CompanyProfileService companyProfileService;
	
	@Override
	public Skill addSkill(Skill skill) throws Exception{
		
		if(skill.getId() != 0){
			SkillGroup skillGroup = getSkillGroup(skill.getSkillGroup().getId());
			skill.setSkillGroup(skillGroup);
			//skillGroup.getSkills().add(skill);
		}
		return skillRepository.saveAndFlush(skill);
	}

	@Override
	public List<SkillGroup> getAllSkillGroup() {
		return skillGroupRepository.findAll();
	}

	@Override
	public SkillGroup addSkillGroup(SkillGroup skillGroup) throws Exception {
		
		if(skillGroup.getId() != 0){
			List<Skill> skills = getSkillsInSkillGroup(skillGroup);
			skillGroup.setSkills(skills);
		}
		return skillGroupRepository.saveAndFlush(skillGroup);
	}

	@Override
	public boolean checkAvailibility(String value , boolean isName, boolean isSkillGroup) {
		boolean isExist = false;
		if(isSkillGroup){
			isExist = isSkillGroupAvailable(value, isName);
		}else{
			isExist = isSkillAvailable(value, isName);
		}
		return isExist;
	};

	@Override
	public Map<String, Object> generateSkillTree(int companyId) {

		Map<String, Object> returnMap = new HashMap<>();

		List<SkillGroup> skillGroups = getAllSkillGroupByComapny( companyId);

		List<Map<String, Object>> skillGroupArray = new ArrayList<>();

		Map<String, Object> organizationMap = new HashMap<>();
		organizationMap.put("id", 0);
		organizationMap.put("icon", "organization");
		if(companyProfileService.getCompany(companyId)==null){
            organizationMap.put("name", generalSettings.getOrganizationName());
        }
        else{
            organizationMap.put("name", companyProfileService.getCompany(companyId).getName());
        }
		organizationMap.put("isExpanded", true);
		
		if (skillGroups.isEmpty()) {
			organizationMap.put("hasChildren", false);
			organizationMap.put("children", new ArrayList<>());
		} else {
			organizationMap.put("hasChildren", true);
			organizationMap.put("children", generateSkillGroupChildren(skillGroups));
		}

		skillGroupArray.add(organizationMap);
		returnMap.put("tree", skillGroupArray);
		returnMap.put("skillGroups", skillGroups);
		return returnMap;
	}

	private List<Map<String, Object>> generateSkillGroupChildren(List<SkillGroup> skillGroups) {
		List<Map<String, Object>> skillGroupArray = new ArrayList<>();

		for (SkillGroup skillGroup : skillGroups) {
			Map<String, Object> skillGroupMap = new HashMap<>();
			skillGroupMap.put("id", "sg_" + skillGroup.getId());
			skillGroupMap.put("databaseId", skillGroup.getId());
			// skillGroupMap.put("icon", "skillGroup");
			skillGroupMap.put("name", skillGroup.getName());
			List<Skill> skills = skillGroup.getSkills();
			if (skills == null || skills.isEmpty()) {
				skillGroupMap.put("hasChildren", false);
				skillGroupMap.put("children", new ArrayList<>());
			} else {
				skillGroupMap.put("hasChildren", true);
				skillGroupMap.put("children", generateSkillChildren(skills));
			}

			skillGroupArray.add(skillGroupMap);
		}
		return skillGroupArray;
	}

	private List<Map<String, Object>> generateSkillChildren(List<Skill> skills) {
		List<Map<String, Object>> skillArray = new ArrayList<>();

		for (Skill skill : skills) {
			Map<String, Object> skillMap = new HashMap<>();
			skillMap.put("id", "s_" + skill.getId());
			skillMap.put("databaseId", skill.getId());
			// skillGroupMap.put("icon", "skillGroup");
			skillMap.put("name", skill.getName());
			skillMap.put("hasChildren", false);
			skillMap.put("children", new ArrayList<>());
			skillArray.add(skillMap);
		}
		return skillArray;
	}

	@Override
	public SkillGroup getSkillGroup(int skillGroupId) throws Exception {
		return skillGroupRepository.findById(skillGroupId).get();
	}

	@Override
	public boolean removeSkillGroup(int skillGroupId){
		boolean isSuccess = true;
		try{
			skillGroupRepository.deleteById(skillGroupId);
		}catch(Exception e){
			isSuccess = false;
			e.printStackTrace();
		}
		return isSuccess;
	}
	
	@Override
	public Skill getSkillById(int skillId) throws Exception {
		return skillRepository.findById(skillId).get();
	}
	
	@Override
	public boolean removeSkill(int skillId){
		boolean isSuccess = true;
		try{
			skillRepository.deleteById(skillId);
		}catch(Exception e){
			isSuccess = false;
			e.printStackTrace();
		}
		return isSuccess;
	}
	
	private boolean isSkillGroupAvailable(String value , boolean isName){
		SkillGroup skillGroup = null;
		boolean isExist = true;
		if (isName) {
			skillGroup = skillGroupRepository.findByName(value);
		} else {
			skillGroup = skillGroupRepository.findByAbbreviation(value);
		}

		if (skillGroup == null) {
			isExist = false;
		}
		return isExist;
	}
	
	private boolean isSkillAvailable(String value , boolean isName){
		Skill skill = null;
		boolean isExist = true;
		if (isName) {
			skill = skillRepository.findByName(value);
		} else {
			skill = skillRepository.findByAbbreviation(value);
		}

		if (skill == null) {
			isExist = false;
		}
		return isExist;
	}

	@Override
	public List<Skill> getSkillsInSkillGroup(SkillGroup skillGroup) {
		return skillRepository.findBySkillGroup(skillGroup);
	}

    @Override
    public List<SkillGroup> getAllSkillGroupByComapny(int companyId) {
        return skillGroupRepository.findByCompany_Id(companyId);
    }


}
