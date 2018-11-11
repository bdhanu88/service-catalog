package com.smart.service_catalog.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.codec.Base64;

import com.smart.service_catalog.model.location.Location;
import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.model.unit.Unit;




public class CommonUtil {


	/**
	 * Returns null if the passed in string contains the string 'null' or just
	 * contains spaces.
	 * 
	 * @param targetString
	 * @return String
	 */

	public static JSONArray generateJsonArrayForCategoryTree(List<Category> categoryList, List<Grade> gradeList,
			String organizationName) throws JSONException {

		JSONArray categoryAndGradeArray = new JSONArray();

		// This returns the ORG name ie: care systems
		categoryAndGradeArray.put(CommonUtil.generateOrganizationJsonObject(organizationName));

		for (Category category : categoryList) {

			JSONObject categoryObejct = new JSONObject();
			JSONObject state = new JSONObject();
			JSONObject a_attr = new JSONObject();

			categoryObejct.put("id", category.getId());
			a_attr.put("class", "CategoryClass");
			// ID of ORG name
			categoryObejct.put("parent", "0");
			state.put("opened", true);
			categoryObejct.put("state", state);
			categoryObejct.put("a_attr", a_attr);
			categoryObejct.put("text", category.getName());
			categoryAndGradeArray.put(categoryObejct);
		}

		for (Grade grade : gradeList) {

			JSONObject gradeObejct = new JSONObject();
			JSONObject state = new JSONObject();
			JSONObject a_attr = new JSONObject();

			a_attr.put("class", "GradeClass");
			gradeObejct.put("id", grade.getId() + "_g");
			gradeObejct.put("parent", grade.getCategory().getId());
			state.put("opened", true);
			gradeObejct.put("state", state);
			gradeObejct.put("a_attr", a_attr);
			gradeObejct.put("text", grade.getName());
			categoryAndGradeArray.put(gradeObejct);
		}
		return categoryAndGradeArray;
	}

	public static List<Map<String,Object>> generateMapForCategoryTree1(List<Category> categoryList, List<Grade> gradeList,
			String organizationName) throws JSONException {
		Map<String,Object> returnMap = new HashMap<>();
		
		returnMap.put("id", 0);
		returnMap.put("name", organizationName);
		returnMap.put("icon", "organization");
		returnMap.put("hasChildren ", true);
		
		List<Map<String,Object>> categories = new ArrayList<>();
		Map<Integer, Map<String, Object>> catParentMap = new HashMap<>();
		for(Category cat : categoryList){
			Map<String, Object> catMap = new HashMap<>();
			catMap.put("id", cat.getId());
			catMap.put("name", cat.getName());
			catMap.put("icon", "category");
			catMap.put("hasChildren", false);
			catMap.put("isExpanded", false);
			categories.add(catMap);
			catParentMap.put(cat.getId(), catMap);
		}
		
		for(Grade grade : gradeList){
			Map<String,Object> parentCategory = catParentMap.get(grade.getCategory().getId());
			List<Map<String,Object>> grades;
			if(parentCategory.containsKey("children")){
				grades = (List<Map<String,Object>>)parentCategory.get("children");
			}else{
				grades = new ArrayList<>();
				parentCategory.put("children",grades);
			}
			Map<String,Object> gradeMap = new HashMap<>();
			gradeMap.put("id", grade.getId());
			gradeMap.put("name", grade.getName());
			gradeMap.put("icon", "grade");
			grades.add(gradeMap);
		}
		returnMap.put("children", categories);
		List<Map<String,Object>> returnList = new ArrayList<>();
		returnList.add(returnMap);
		return returnList;
		
	}
	public static byte[] getImgBytes(File file) {
		byte[] encoded = null;
		try {
			FileInputStream fis = new FileInputStream(file);

			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			int b;
			byte[] buffer = new byte[1024];
			while ((b = fis.read(buffer)) != -1) {
				bos.write(buffer, 0, b);
			}
			byte[] fileBytes = bos.toByteArray();
			fis.close();
			bos.close();
			encoded = Base64.encode(fileBytes);
		} catch (Exception e1) {
			//logger.error("Exception :", e1);
			return null;
		}
		return encoded;

	}

	public static JSONObject generateOrganizationJsonObject(String organizationName) throws JSONException {
		return generateOrganizationJsonObject(organizationName, 0);
	}

	public static JSONObject generateOrganizationJsonObject(String organizationName, int parentId)
			throws JSONException {
		JSONObject parentObejct = new JSONObject();
		JSONObject state = new JSONObject();
		JSONObject a_attr = new JSONObject();

		state.put("selected", true);
		state.put("opened", true);
		a_attr.put("class", "OrganizationClass");

		// set s parent ID to 0
		parentObejct.put("id", parentId);
		parentObejct.put("icon", "/careware/assets/img/unit/organization.png");
		parentObejct.put("parent", "#");
		parentObejct.put("state", state);
		parentObejct.put("a_attr", a_attr);
		parentObejct.put("text", organizationName); // Hard coding the
													// organization name

		return parentObejct;
	}
	
	/**
	 * Returns the parameter specified from the {@link HttpServletRequest}
	 * instance.
	 * 
	 * @param request
	 * @param parameterName
	 * 
	 * @return String
	 */
	public static String getRequestParameter(final HttpServletRequest request, final String parameterName) {
		return nullifyNullOrEmptyString(request.getParameter(parameterName));
	}
	
	/**
	 * Returns null if the passed in string contains the string 'null' or just
	 * contains spaces.
	 * 
	 * @param targetString
	 * @return String
	 */

	public static String nullifyNullOrEmptyString(final String targetString) {
		String outputString = null;

		if (targetString != null) {
			String targetStringTrim = targetString.trim();
			if ((!"null".equalsIgnoreCase(targetStringTrim)) && (targetStringTrim.length() > 0)) {
				outputString = targetStringTrim;
			}
		}

		return outputString;
	}

	
	/**
	 * 
	 * @param orderBy
	 * @return Sort
	 */
	public static Sort sortByOrderIdAsc(String orderBy) {
		return new Sort(Sort.Direction.ASC, orderBy);
	}

	public static List<Map<String,Object>> generateMapUnitTree(List<Unit> unitList) throws Exception {
		
		List<Map<String,Object>> returnList = new ArrayList<>();
		// unit list is ordered by unit level id then unit id
		Map<Integer, Map<String, Object>> unitParentMap = new HashMap<>();
		Boolean isFirstTime = true;
		for(Unit unit : unitList){
			Map<String,Object> unitMap = new HashMap<>();
			unitMap.put("id", unit.getUnitLevel().getId()+"_"+unit.getId());
			unitMap.put("name",unit.getName());
			unitParentMap.put(unit.getId(), unitMap);
			int parentId = 0;
			if(unit.getParentUnit() != null){
				parentId = unit.getParentUnit().getId();
			}
			setValuesForTreeNode(unitMap, isFirstTime, returnList, unitParentMap, parentId);
			/*if(isFirstTime){// organization unit	
				
				unitMap.put("hasChildren", true);
				returnList.add(unitMap);
				isFirstTime = false;
			}else{
			
				Map<String, Object> parentUnitMap = unitParentMap.get(unit.getParentUnit().getId());
				List<Map<String,Object>> childrenList;
				if(parentUnitMap.containsKey("children")){
					childrenList = (List<Map<String,Object>>)parentUnitMap.get("children");
				}else{
					childrenList = new ArrayList<>();
					
				}
				
				childrenList.add(unitMap);
				parentUnitMap.put("children", childrenList);
			}*/
		}
		return returnList;
	}
	
	public static void setValuesForTreeNode(Map<String,Object> itemMap, Boolean isFirstTime, List<Map<String,Object>> returnList,
			      Map<Integer, Map<String, Object>> itemParentMap, int parentId){
		if(parentId == 0){// organization unit	
			itemMap.put("hasChildren", true);
			returnList.add(itemMap);
			isFirstTime = false;
		}else{
		
			Map<String, Object> parentItemMap = itemParentMap.get(parentId);
			List<Map<String,Object>> childrenList;
			if(parentItemMap.containsKey("children")){
				childrenList = (List<Map<String,Object>>)parentItemMap.get("children");
			}else{
				childrenList = new ArrayList<>();
				
			}
			
			childrenList.add(itemMap);
			parentItemMap.put("children", childrenList);
		}
	}
	
	public static List<Map<String,Object>> generateMapLocationTree(List<Location> locationList) throws Exception {
		
		List<Map<String,Object>> returnList = new ArrayList<>();
		// unit list is ordered by unit level id then unit id
		Map<Integer, Map<String, Object>> locationParentMap = new HashMap<>();
		Boolean isFirstTime = true;
		for(Location location : locationList){
			Map<String,Object> locationMap = new HashMap<>();
			locationMap.put("id", location.getLocationLevel().getId()+"_"+location.getId());
			locationMap.put("name",location.getName());
			locationParentMap.put(location.getId(), locationMap);
			int parentId = 0;
			if(location.getParentLocation() != null){
				parentId = location.getParentLocation().getId();
			}
			setValuesForTreeNode(locationMap, isFirstTime, returnList, locationParentMap, parentId );
		}
		return returnList;
	}
}