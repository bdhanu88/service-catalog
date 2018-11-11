/** 
* <p>Title/Module : Category and Grades </p>
* <p>Description : Controller class of category and grades </p>   
* @date : 2015-12-04
* @author : 
* @version : 1.0
* Copyright (c) 2015-2016 Caresystems, Inc. All Rights Reserved.
*/
package com.smart.service_catalog.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.service.settings.generalSettings.category.GradeService;
import com.smart.service_catalog.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.smart.service_catalog.service.settings.generalSettings.category.CategoryService;
//import CommonUtil;
//import com.csi.service_catalog.util.property.CategorySettings;
//import GeneralSettings;
//import com.csi.service_catalog.util.property.GradeSettings;


@RequestMapping(value = "category")
@RestController
public class CategoryController {

	//private static final Logger logger = Logger.getLogger(CategoryController.class);

	// parameters for paging
	private static final int pageNumber = 0;
	private static final String orderByColumnNm = "orderId";
	private static final Direction sortDirection = Sort.Direction.ASC;

	@Autowired
	CategoryService categoryService;

	@Autowired
    GradeService gradeService;

	/**
	 * init method executes on been initialization
	 */
	@PostConstruct
	private void init() throws Exception {
	
	}

	
	
	@RequestMapping(value = "category", method = RequestMethod.GET)
	public ResponseEntity<?> getCategoryGradeArray(HttpServletRequest request,@RequestParam(value = "companyId",defaultValue = "1")int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			
		 List<Map<String, Object>> parentCategoryList = categoryService.getCategoryTree();
		 returnMap.put("categoryTree", parentCategoryList);
		}catch(Exception e){
			
		}
	
		//returnMap.put("categoryTree", categoryTree.toString());
	
		return ResponseEntity.ok(returnMap);
	}
	

	/**
	 * This method adds a Category
	 * <p>
	 * if Category already exist it will replace by new Category
	 * 
	 * @param category
	 *            category object to add
	 * @param bindingResult
	 *            provide data binding and validation functionality
	 * @param model
	 *            hold a Map of Attributes which need to build UI
	 * 
	 * @return String to redirect(category home page)
	 */
	@PreAuthorize("hasAuthority('CATEGORY_EDIT')")
	@RequestMapping(value = "category/add", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addCategoryPost(@RequestBody Category category) {

		List<Category> categoryList = new ArrayList<>();
		List<Integer> idList = new ArrayList<>();
		Map<String, Object> returnMap = new HashMap<>();
		
		try {			
				if(!((int) (long) categoryService.count() == 0)){
					Page<Category> categoryPage = null;
					categoryPage = categoryService.getAllCategories(pageNumber, (int) (long) categoryService.count(),
							sortDirection, orderByColumnNm);
					categoryList = categoryPage.getContent();	
				}
				
				for (Category categoryItr : categoryList) {
					idList.add(categoryItr.getOrderId());
				}
				
				// add order value for new category.
				if(idList.size() != 0){
					Collections.sort(idList);
					category.setOrderId((idList.get(idList.size() - 1)) + 1);
				}else{
					category.setOrderId(0);
				}

				categoryService.addCategory(category);
				List<Category> allCategories = categoryService
						.getAllCategoriesOrderByOrderIdAsc(CommonUtil.sortByOrderIdAsc("orderId"));
				returnMap.put("success", true);
				returnMap.put("categoryTree", categoryService.getCategoryTree());
				returnMap.put("categories", allCategories);
			} catch (Exception e) {
				//logger.error("Category adding failed", e);
				returnMap.put("success", false);
			}
			return returnMap;
	}

	/**
	 * This method adds a Grade to the System
	 * <p>
	 * if Grade is already exist it will replace by new Grade
	 * 
	 * @param grade
	 *            Grade object to add
	 * @param bindingResult
	 *            provide data binding and validation functionality
	 * @param model
	 *            hold a Map of Attributes which need to build UI
	 * 
	 * @return String to redirect(category home page)
	 */
	//@PreAuthorize("hasAuthority('CTRL_CATEGORY_GRADE_ADD')")
	@RequestMapping(value = "grade/add", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addGradePost(@RequestBody Grade grade) {
		
		Map<String, Object> returnMap = new HashMap<>();
		try {
			Category category = categoryService.getCategory(grade.getCategory().getId());
			grade.setCategory(category);

			// get grades by category and get orders.
			List<Grade> gradeList = gradeService.findGradeByCategory(category);
			List<Integer> idList = new ArrayList<>();
			for (Grade gradeItr : gradeList) {
				idList.add(gradeItr.getOrderId());
			}

			// add order value for new grade.
			int nextNum = 0;
			if (idList.size() != 0) {
				Collections.sort(idList);
				nextNum = idList.get(idList.size() - 1);
				nextNum++;
			}
			grade.setOrderId(nextNum);

			gradeService.addGrade(grade);
			returnMap.put("success", true);
			returnMap.put("categoryTree", categoryService.getCategoryTree());

		} catch (Exception e) {
			returnMap.put("success", false);
			//logger.error("Grade adding failed", e);
		}
		return returnMap;
	}

	/**
	 * This method edits existing Category
	 *
	 * @param category
	 *            Category object to add
	 * @param bindingResult
	 *            provide data binding and validation functionality
	 * @param model
	 *            hold a Map of Attributes which need to build UI
	 * 
	 * @return will return the return of addCategoryPost(Category category,
	 *         BindingResult bindingResult,ModelMap model)
	 */
	//@PreAuthorize("hasAuthority('CTRL_CATEGORY_EDIT')")
	/*@RequestMapping(value = "edit", method = RequestMethod.POST)
	public String editCategoryPost(@Valid @ModelAttribute("category") Category category, BindingResult bindingResult,
			ModelMap model) {
		// This will reduce the code reuse
		// Calling the AdCategoryPost method
		//return addCategoryPost(category, bindingResult, model);
	}*/

	
	@RequestMapping(value = "category/checkExist", method = RequestMethod.GET)
	public Map<String, Object> getCategoryExistense(HttpServletRequest request,
			@RequestParam(value = "categoryName", required = false, defaultValue = "") String categoryName,
			@RequestParam(value = "categoryId", required = false, defaultValue = "0") int categoryId,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit
            ,@RequestParam(value = "companyId",defaultValue = "1") int companyId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			Category  category = null;
			returnMap.put("success", false);
			if(isEdit && categoryId != 0){
				category = categoryService.getCategory(categoryId);
				if(category.getName().equals(categoryName)){
					return returnMap;
				}
			}		

			if ((categoryName != null)) {
				returnMap.put("success", categoryService.isCategoryNameAvailable(categoryName,companyId));
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}

	@RequestMapping(value = "abbreviation/checkExist", method = RequestMethod.GET)
	public Map<String, Object> getAbbreviationExistense(HttpServletRequest request,
			@RequestParam(value = "abbreviation", required = false, defaultValue = "") String abbreviation,
			@RequestParam(value = "isCategory", required = false, defaultValue = "false") boolean isCategory,
			@RequestParam(value = "id", required = false, defaultValue = "0") int id,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			returnMap.put("success", false);
			
			if ((abbreviation != null && !abbreviation.isEmpty())) {
				if(isCategory){
					if(isEdit && id != 0){
						Category category = categoryService.getCategory(id);
						if(category.getAbbreviation().equals(abbreviation)){
							return returnMap;
						}
					}
					returnMap.put("success", categoryService.isAbbreviationAvailable(abbreviation));
				}else{
					if(isEdit && id != 0){
						Grade grade = gradeService.getGrade(id);
						if(grade.getAbbreviation().equals(abbreviation)){
							return returnMap;
						}
					}
					returnMap.put("success",gradeService.isAbbreviationAvailable(abbreviation));
				}
				
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	@PreAuthorize("hasAuthority('CATEGORY_VIEW')")
	@RequestMapping(value = "getCategory", method = RequestMethod.GET)
	public Map<String, Object> getCategory(HttpServletRequest request,
			@RequestParam(value = "categoryId", required = false, defaultValue = "0") int categoryId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			
			Category category = categoryService.getCategory(categoryId);
			if(category != null){
				returnMap.put("category", category);
				returnMap.put("success", true);
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
    @PreAuthorize("hasAuthority('CATEGORY_EDIT')")
	@RequestMapping(value = "remove/category", method = RequestMethod.GET)
	public Map<String, Object> deleteCategory(HttpServletRequest request,
			@RequestParam(value = "categoryId", required = false, defaultValue = "0") int categoryId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try {
			
			Category category = categoryService.getCategory(categoryId);

			if (category != null) {
				categoryService.deleteCategory(category);
				returnMap.put("categoryTree", categoryService.getCategoryTree());
				returnMap.put("success", true);
			}
			
		} catch (Exception e) {
			
		}
		return returnMap;
		
	}
    @PreAuthorize("hasAuthority('CATEGORY_VIEW')")
	@RequestMapping(value = "getAllCategories", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getAllCategories() {
		Map<String,Object> returnMap = new HashMap<>();
		List<Category> allCategories = categoryService
				.getAllCategoriesOrderByOrderIdAsc(CommonUtil.sortByOrderIdAsc("orderId"));
		returnMap.put("success", true);
		returnMap.put("categories", allCategories);
		return returnMap;
	}
	
	@RequestMapping(value = "grade/checkExist", method = RequestMethod.GET)
	public Map<String, Object> getGradeExistense(HttpServletRequest request,
			@RequestParam(value = "gradeName", required = false, defaultValue = "") String gradeName,
			@RequestParam(value = "gradeId", required = false, defaultValue = "0") int gradeId,
			@RequestParam(value = "isEdit", required = false, defaultValue = "false") boolean isEdit){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			Grade  grade = null;
			returnMap.put("success", false);
			if(isEdit && gradeId != 0){
				grade = gradeService.getGrade(gradeId);
				if(grade.getName().equals(gradeName)){
					return returnMap;
				}
			}
			

			if ((gradeName != null)) {
				returnMap.put("success", gradeService.isGradeNameAvailable(gradeName));
			}

		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "getGrade", method = RequestMethod.GET)
	public Map<String, Object> getGrade(HttpServletRequest request,
			@RequestParam(value = "gradeId", required = false, defaultValue = "0") int gradeId){
		Map<String, Object> returnMap = new HashMap<>();
		try{
			
			Grade grade = gradeService.getGrade(gradeId);
			if(grade != null){
				returnMap.put("grade", grade);
				returnMap.put("success", true);
			}
		}catch(Exception e){
			returnMap.put("success", false);
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "remove/grade", method = RequestMethod.GET)
	public Map<String, Object> deleteGrade(HttpServletRequest request,
			@RequestParam(value = "gradeId", required = false, defaultValue = "0") int gradeId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("success", false);
		try {
			
			Grade grade = gradeService.getGrade(gradeId);

			if (grade != null) {
				gradeService.deleteGrade(grade);
				returnMap.put("categoryTree", categoryService.getCategoryTree());
				returnMap.put("success", true);
			}
			
		} catch (Exception e) {
			
		}
		return returnMap;
		
	}
	
	@RequestMapping(value = "order", method = RequestMethod.GET)
	@ResponseBody
	// TODO permission
    @PreAuthorize("hasAuthority('CATEGORY_EDIT')")
	public Map<String, Object> orderCategoryGrade(final HttpServletRequest request,
			@RequestParam(value = "gradeIds", required = false, defaultValue = "") List<Integer> gradeIds,
			@RequestParam(value = "categoryIds", required = false, defaultValue = "") List<Integer> categoryIds) {

		Map<String, Object> returnMap = new HashMap<>();
		boolean hasError = false;

		try {

			for (int x = 0, categoryArrayLength = categoryIds.size(); x < categoryArrayLength; x++) {
				Category category = categoryService.getCategory(categoryIds.get(x));
				category.setOrderId(x);
				categoryService.addCategory(category);
			}

			for (int y = 0, gradeArrayLength = gradeIds.size(); y < gradeArrayLength; y++) {
				Grade grade = gradeService.getGrade(gradeIds.get(y));
				grade.setOrderId(y);
				gradeService.addGrade(grade);
			}

			/*
			 * JSONArray categoryArray =
			 * CommonUtil.generateJsonArrayForCategoryTree(
			 * categoryService.getAllCategories(), gradeService.getAllGrades());
			 * 
			 * returnMap.put("categoryArray",
			 * mapper.writeValueAsString(categoryArray));
			 */

		} catch (Exception e) {
			hasError = true;
			//logger.error("Category not found", e);
		}
		returnMap.put("hasError", hasError);

		return returnMap;
	}

	@GetMapping(value = "getgrades")
    public List<Grade> getAllGrades(@RequestParam(value = "companyId",defaultValue = "1")int companyId){
	    List<Grade> gradeList=gradeService.getGradesByCompany(companyId);
	    return gradeList;
    }
}
