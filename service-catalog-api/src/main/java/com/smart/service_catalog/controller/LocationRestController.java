package com.smart.service_catalog.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.smart.service_catalog.model.location.Location;
import com.smart.service_catalog.model.settings.generalSettings.hierarchy.LocationLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smart.service_catalog.service.location.LocationService;
import com.smart.service_catalog.service.settings.generalSettings.hierarchy.LocationLevelService;

@RequestMapping(value = "location")
@RestController
public class LocationRestController {
	
	@Autowired
	LocationLevelService locationLevelService;
	
	@Autowired
	LocationService locationService;
	
	@RequestMapping(value = "locationHierarchy", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getLocationHierarchy() {
		Map<String,Object> returnMap = new HashMap<>();
		try{
			
			returnMap.put("hierarchy", locationLevelService.getLocationLevelList());
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
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			LocationLevel locationLevel = null;
			returnMap.put("success", false);
			if(isEdit && levelId != 0){
				locationLevel = locationLevelService.getLocationLevel(levelId);
				if(locationLevel.getName().equals(levelName)){
					return returnMap;
				}
			}
			

			if ((levelName != null)) {
				returnMap.put("success", locationLevelService.isLocationLevelNameAvailable(levelName));
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
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			returnMap.put("success", false);
			
			if (abbreviation != null) {
				
					if(isEdit && id != 0){
						LocationLevel locationLevel = locationLevelService.getLocationLevel(id);
						if(locationLevel.getAbbreviation().equals(abbreviation)){
							return returnMap;
						}
					}
					returnMap.put("success", locationLevelService.isAbbreviationAvailable(abbreviation));
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "level/add", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnitLevel(@RequestBody LocationLevel locationLevel) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success",true);
		try{
			locationLevelService.addLocationLevel(locationLevel);
			returnMap.put("hierarchy", locationLevelService.getLocationLevelList());
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "level/delete", method = RequestMethod.GET)
	public Map<String, Object> deleteUnitLevel(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			locationLevelService.deleteLocationLevel(id);
			returnMap.put("hierarchy",locationLevelService.getLocationLevelList());
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkForDeleteValidity", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnit(@RequestBody LocationLevel locationLevel) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			List<LocationLevel> locationLevels = locationLevelService.getLocationLevelList();
			if(locationLevel.getId() == locationLevels.get(0).getId()){
				returnMap.put("success", false);
				returnMap.put("isParentOrg", true);
			}else{
				List<Location> locations = locationService.getLocationsMappedToLocationLevel(locationLevel);
				if(!locations.isEmpty()){
					returnMap.put("success", false);
					returnMap.put("isParentOrg", false);
				}
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "locationTree", method = RequestMethod.GET)
	public Map<String,Object> getUnitTree()
    {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			returnMap.put("itemTree", locationService.getLocationTree());
			returnMap.put("itemLevel",locationLevelService.getLocationLevelList());
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		
		return returnMap;
	}
	
	@RequestMapping(value = "addLocation", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUnit(@RequestBody Map<String, Object> locationForm) {
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			Location location = new Location();
			int id = Integer.parseInt((String)locationForm.get("id"));
			location.setId(id);
			location.setName((String)locationForm.get("name"));
			location.setAbbreviation((String)locationForm.get("abbreviation"));
			Location parentLocation = locationService.getLocation(Integer.parseInt((String)locationForm.get("parentItemId")));
			location.setParentLocation(parentLocation);
			LocationLevel locationLevel = locationLevelService.getLocationLevel((int)locationForm.get("itemLevelId"));
			location.setLocationLevel(locationLevel);
			locationService.addLocation(location);
			returnMap.put("itemTree", locationService.getLocationTree());
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "deleteLocation", method = RequestMethod.GET)
	public Map<String, Object> deleteUnit(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", true);
		try{
			locationService.deleteLocation(id);
			returnMap.put("itemTree", locationService.getLocationTree());
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "checkLocationExist", method = RequestMethod.GET)
	public Map<String, Object> getUnitExistense(HttpServletRequest request,
			@RequestParam(value = "value", required = false, defaultValue = "") String unitName,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try{
			if(locationService.isLocationNameExist(unitName)){
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
			if(locationService.isAbbreviationExist(abbreviation)){
				returnMap.put("success", true);
			}
			
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
	
	@RequestMapping(value = "getLocation", method = RequestMethod.GET)
	public Map<String, Object> getUnit(HttpServletRequest request,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try{
			Location location = locationService.getLocation(id);
			if(location != null){
				returnMap.put("item", location);
				returnMap.put("success", true);
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
	}
}
