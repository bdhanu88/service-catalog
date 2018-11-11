package com.smart.service_catalog.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import com.smart.service_catalog.service.settings.generalSettings.hierarchy.UnitLevelService;
import com.smart.service_catalog.service.unit.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smart.service_catalog.model.unit.Unit;

@RequestMapping(value = "unit")
@RestController
public class UnitController {
	
	@Autowired
    UnitLevelService unitLevelService;
	
	@Autowired
    UnitService unitService;
	
	@RequestMapping(value = "unitHierarchy", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getUnitHierarchy(@RequestParam(value = "companyId",defaultValue = "1")int companyId) {
		Map<String,Object> returnMap = new HashMap<>();
		try{
			
			returnMap.put("hierarchy", unitLevelService.getUnitLevelList(companyId));
			returnMap.put("success", true );
		}catch(Exception e){
			returnMap.put("success", false );
		}
		return returnMap;
	}
	
	@RequestMapping(value = "level/checkExist", method = RequestMethod.GET)
	public Map<String, Object> getLevelExistense(HttpServletRequest request,
			@RequestParam(value = "value", required = false, defaultValue = "") String levelName,
			@RequestParam(value = "levelId", required = false, defaultValue = "0") int levelId,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit,
            @RequestParam(value="companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			UnitLevel unitLevel = null;
			returnMap.put("success", false);
			if(isEdit && levelId != 0){
				unitLevel = unitLevelService.getUnitLevel(levelId);
				if(unitLevel.getName().equals(levelName)){
					return returnMap;
				}
			}
			

			if ((levelName != null)) {
				returnMap.put("success", unitLevelService.isUnitLevelNameAvailable(levelName,companyId));
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "level/abbreviation/checkExist", method = RequestMethod.GET)
	public Map<String, Object> getAbbreviationExistense(HttpServletRequest request,
			@RequestParam(value = "value", required = false, defaultValue = "") String abbreviation,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit
            ,@RequestParam(value="companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			returnMap.put("success", false);
			
			if (abbreviation != null) {
				
					if(isEdit && id != 0){
						UnitLevel unitLevel = unitLevelService.getUnitLevel(id);
						if(unitLevel.getAbbreviation().equals(abbreviation)){
							return returnMap;
						}
					}
					returnMap.put("success", unitLevelService.isAbbreviationAvailable(abbreviation,companyId));
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "level/add", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnitLevel(@RequestBody UnitLevel unitLevel) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success",true);
		try{
			unitLevelService.addUnitLevel(unitLevel);
			returnMap.put("hierarchy", unitLevelService.getUnitLevelList(unitLevel.getCompany().getId()));
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "level/delete", method = RequestMethod.GET)
	public Map<String, Object> deleteUnitLevel(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id
            ,@RequestParam(value="companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			unitLevelService.deleteUnitLevel(id);
			returnMap.put("hierarchy", unitLevelService.getUnitLevelList(companyId));
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "unitTree", method = RequestMethod.GET)
	public Map<String,Object> getUnitTree(@RequestParam(value = "companyId",defaultValue = "1")int companyId
    ){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			returnMap.put("itemTree", unitService.getUnitTree(companyId));
			returnMap.put("itemLevel", unitLevelService.getUnitLevelList(companyId) );
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		
		return returnMap;
	}



	@PreAuthorize("hasAuthority('UNIT_EDIT')")
	@RequestMapping(value = "addUnit", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnit(@RequestBody Map<String, Object> unitForm) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			Unit unit = new Unit();
			int id = Integer.parseInt((String)unitForm.get("id"));
			unit.setId(id);
			unit.setName((String)unitForm.get("name"));
			unit.setAbbreviation((String)unitForm.get("abbreviation"));
			Unit parentUnit = unitService.getUnit(Integer.parseInt((String)unitForm.get("parentItemId")));
			unit.setParentUnit(parentUnit);
			UnitLevel unitLevel = unitLevelService.getUnitLevel((int)unitForm.get("itemLevelId"));
			unit.setUnitLevel(unitLevel);
			unitService.addUnit(unit);
			returnMap.put("itemTree", unitService.getUnitTree(unitLevel.getCompany().getId()));
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
    @PreAuthorize("hasAuthority('UNIT_EDIT')")
	@RequestMapping(value = "deleteUnit", method = RequestMethod.GET)
	public Map<String, Object> deleteUnit(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			unitService.deleteUnit(id);
			returnMap.put("unitTree", unitService.getUnitTree(companyId));
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkUnitExist", method = RequestMethod.GET)
	public Map<String, Object> getUnitExistense(HttpServletRequest request,
			@RequestParam(value = "value", required = false, defaultValue = "") String unitName,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try{
			if(unitService.isUnitNameExist(unitName,companyId)){
				returnMap.put("success", true);
			}
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkAbbreviationExist", method = RequestMethod.GET)
	public Map<String, Object> getAbbreviationExistense(HttpServletRequest request,
			@RequestParam(value = "abbreviation", required = false, defaultValue = "") String abbreviation,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try{
			if(unitService.isAbbreviationExist(abbreviation,companyId)){
				returnMap.put("success", true);
			}
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
    @PreAuthorize("hasAuthority('UNIT_VIEW')")
	@RequestMapping(value = "getUnit", method = RequestMethod.GET)
	public Map<String, Object> getUnit(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try{
			Unit unit = unitService.getUnit(id);
			if(unit != null){
				returnMap.put("item", unit);
				returnMap.put("success", true);
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkForDeleteValidity", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnit(@RequestBody UnitLevel unitLevel
            ,@RequestParam(value="companyId",defaultValue = "1")int companyId) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			List<UnitLevel> unitLevels = unitLevelService.getUnitLevelList(companyId);
			if(unitLevel.getId() == unitLevels.get(0).getId()){
				returnMap.put("success", false);
				returnMap.put("isParentOrg", true);
			}else{
				List<Unit> units = unitService.getUnitsMappedToUnitLevel(unitLevel);
				if(!units.isEmpty()){
					returnMap.put("success", false);
					returnMap.put("isParentOrg", false);
				}
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
}
