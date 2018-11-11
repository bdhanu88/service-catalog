package com.smart.service_catalog.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;
import com.smart.service_catalog.model.settings.generalSettings.skill.SkillGroup;

@RestController
@RequestMapping("skill")
public class SkillRestController {

	@Autowired
	private SkillService skillService;

	/**
	 * 
	 * @return
	 */
	@PreAuthorize("hasAuthority('SKILL_VIEW')")
	@RequestMapping(value = "getTree", method = RequestMethod.GET)
	public Map<String, Object> getCategoryGradeArray(@RequestParam(value = "companyId",defaultValue = "1")int companyId ) {
		return skillService.generateSkillTree(companyId);
	}

	@RequestMapping(value = "checkExist", method = RequestMethod.GET)
	public Map<String, Object> checkAvailibility(
			@RequestParam(value = "value", required = false, defaultValue = "") String value,
			@RequestParam(value = "isName", required = false, defaultValue = "true") boolean isName,
			@RequestParam(value = "isSkillGroup", required = false, defaultValue = "true") boolean isSkillGroup) {
		Map<String, Object> returnMap = new HashMap<>();

		boolean isExist = false;
		try {
			if (value.trim().length() > 0) {
				isExist = skillService.checkAvailibility(value.trim(), isName, isSkillGroup);
			}
			returnMap.put("success", isExist);
		} catch (Exception e) {
			returnMap.put("success", isExist);
		}
		return returnMap;

	}

	/**
	 * This method adds a Skill Group
	 * <p>
	 * if Skill Group already exist it will replace by new Skill Group
	 * 
	 * @param skillGroup
	 *            skillGroup object to add
	 * 
	 * @return String to redirect(category home page)
	 * @throws IOException
	 */
	 @PreAuthorize("hasAuthority('SKILL_EDIT')")
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public Map<String, Object> addSkillPost(@RequestBody Skill skill) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		try {
			skillService.addSkill(skill);
			returnMap.put("isSuccess", true);
		} catch (Exception e) {
			returnMap.put("isSuccess", false);
		}

		returnMap.putAll(skillService.generateSkillTree(skill.getSkillGroup().getCompany().getId()));
		return returnMap;
	}

	/**
	 * This method adds a Skill Group
	 * <p>
	 * if Skill Group already exist it will replace by new Skill Group
	 * 
	 * @param skillGroup
	 *            skillGroup object to add
	 * 
	 * @return String to redirect(category home page)
	 * @throws IOException
	 */
	// @PreAuthorize("hasAuthority('CTRL_CATEGORY_ADD')")
	@RequestMapping(value = "skillGroup/add", method = RequestMethod.POST)
	public Map<String, Object> addSkillGroupPost(@RequestBody SkillGroup skillGroup) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		try {
			skillService.addSkillGroup(skillGroup);
			returnMap.put("isSuccess", true);
		} catch (Exception e) {
			returnMap.put("isSuccess", false);
		}

		returnMap.putAll(skillService.generateSkillTree(skillGroup.getCompany().getId()));
		return returnMap;
	}

	@RequestMapping(value = "getSkillGroupById", method = RequestMethod.GET)
	public Map<String, Object> getSkillGroupById(@RequestParam(value = "id") int skillGroupId) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		boolean isSuccess = false;
		SkillGroup skillGroup = null;
		try {
			skillGroup = skillService.getSkillGroup(skillGroupId);
			if (skillGroup != null) {
				isSuccess = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		returnMap.put("entity", skillGroup);
		returnMap.put("isSuccess", isSuccess);
		return returnMap;
	}

	@RequestMapping(value = "removeSkillGroup", method = RequestMethod.GET)
	public Map<String, Object> removeSkillGroup(@RequestParam(value = "id") int skillGroupId
    ,@RequestParam(value = "companyId",defaultValue = "1")int companyId) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("isSuccess", skillService.removeSkillGroup(skillGroupId));
		returnMap.putAll(skillService.generateSkillTree(companyId));

		return returnMap;
	}

	@RequestMapping(value = "getSkillById", method = RequestMethod.GET)
	public Map<String, Object> getSkillById(@RequestParam(value = "id") int skillId) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		boolean isSuccess = false;
		Skill skill = null;
		try {
			skill = skillService.getSkillById(skillId);
			if (skill != null) {
				isSuccess = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		returnMap.put("entity", skill);
		returnMap.put("isSuccess", isSuccess);
		return returnMap;
	}

	@RequestMapping(value = "removeSkill", method = RequestMethod.GET)
	public Map<String, Object> removeSkill(@RequestParam(value = "id") int skillId
    ,@RequestParam(value = "companyId",defaultValue = "1")int companyId) throws IOException {

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("isSuccess", skillService.removeSkill(skillId));
		returnMap.putAll(skillService.generateSkillTree(companyId));

		return returnMap;
	}

	@GetMapping(value = "getskillgroup")
    public Map<String,Object> getSkillGroup(@RequestParam(value = "companyId",defaultValue = "1")int companyId){
        Map<String, Object> returnMap = new HashMap<>();
        List<Skill> skillList=new ArrayList<Skill>();
        List<SkillGroup> skillGroupArrayList= skillService.getAllSkillGroupByComapny(companyId);
        for (SkillGroup skillGroup:skillGroupArrayList) {
            skillList.addAll(skillService.getSkillsInSkillGroup(skillGroup));
        }
        returnMap.put("skillGroup",skillList);
        return returnMap;
    }

}
