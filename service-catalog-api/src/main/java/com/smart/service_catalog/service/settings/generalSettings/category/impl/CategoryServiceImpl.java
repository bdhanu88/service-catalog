/**
 * <p>
 * Title/Module : Category
 * </p>
 * <p>
 * Description : All the service methods related to category implement in this class
 * </p>
 * 
 * @date : YYYY-MM-DD
 * @author :
 * @version : 1.0 Copyright (c) 2015-2016 Caresystems, Inc. All Rights Reserved.
 */
package com.smart.service_catalog.service.settings.generalSettings.category.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.smart.service_catalog.repository.settings.generalSettings.category.CategoryRepo;
import com.smart.service_catalog.service.settings.generalSettings.category.GradeService;
import com.smart.service_catalog.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.service.settings.generalSettings.category.CategoryService;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.CategoryNotFoundException;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.DuplicateCategoryException;
import com.smart.service_catalog.util.property.GeneralSettings;



@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo catRepo;

    Map<String, Object> categoryDataMap;
    
    @Autowired
	private GeneralSettings generalSettings;
    
    @Autowired
	CategoryService categoryService;

	@Autowired
    GradeService gradeService;

    /**
     * Adds new Category to application if category already exists it throws DuplicateCategoryException
     * 
     * @param category
     *            new category to add
     * @throws DuplicateCategoryException
     *             if category already exist
     */
    @Override
    public void addCategory(Category category) throws DuplicateCategoryException {
        catRepo.save(category);
    }

    /**
     * Finds and returns category object of provided category id
     * 
     * @param id
     *            id of the category
     * @return A category object
     * @throws CategoryNotFoundException
     */
    @Override
    public Category getCategory(Integer id) throws CategoryNotFoundException {
        return catRepo.findById(id).get();
    }

    /**
     * Updates Category
     * <p>
     * This method saves category object if it not exist if it exist it will replace current object
     * 
     * @param category
     *            category to be saved
     * @throws CategoryNotFoundException
     */
    @Override
    public void updateCategory(Category category) throws CategoryNotFoundException {
        catRepo.save(category);
    }

    /**
     * Deletes a category from system
     * <p>
     * if category is not existing it will throw categoryNotFoundException
     * 
     * @param category
     *            category to delete
     * @throws CategoryNotFoundException
     */
    @Override
    public void deleteCategory(Category category) throws CategoryNotFoundException {
        catRepo.delete(category);
    }

    /**
     * Finds the Availability of a category name
     * 
     * @param categoryName
     *            Name of the category
     * @return boolean(if category name exist returns true else returns false)
     */
    
    /** Finds and returns all categories
    * 
    * @return List of all categories
    */
   //@Transactional(value = "transactionManager")
   @Override
   public List<Category> getAllCategories(int companyId) {
       return catRepo.getAllCategoriesByCompanyId(companyId);
   }
    
    @Override
    public boolean isCategoryNameAvailable(String categoryName, int companyId) {
        boolean isAvailable = false;
        Category category = catRepo.findByCategoryName(categoryName,companyId);

        if (category != null) {
            isAvailable = true;
        }
        return isAvailable;
    }

    /**
     * Finds list of categories by provided list of category id
     * 
     * @param categoryIdList
     *            List of category id
     * @return List of categories corresponding to provide list of id
     */
    @Override
    public List<Category> getSelectedCategories(List<Integer> categoryIdList) {
        return catRepo.findSpecificListOfCategories(categoryIdList);
    }

    /**
     * Method is to store data in a map to use it later
     * <p>
     * web services use to retrieve data
     * 
     * @param key
     *            key of the map data will retrieve using this key
     * @param value
     *            data to store in the map
     */
    @Override
    public void addDataToCategoryDataMap(String key, Object value) {
        if (categoryDataMap == null) {
            categoryDataMap = new HashMap<String, Object>();
        }
        categoryDataMap.put(key, value);
    }

    /**
     * Method is to load all the available categories to select when adding a grade
     * 
     * @return A Map of parent Categories
     */
    @Override
    public Map<String, String> getParentCategoriesMap(int pageNumber, int pageSize, Direction sortDirection, String orderByColumnNm) {
    	
    	Page<Category> categoryPage = getAllCategories(pageNumber, pageSize, sortDirection, orderByColumnNm);
    	List<Category> categoryList = categoryPage.getContent();
    	
        Map<String, String> parentCategories = new HashMap<String, String>();

        for (int i = 0; i < categoryList.size(); i++) {
            parentCategories.put(String.valueOf(categoryList.get(i).getId()), categoryList.get(i).getName());
        }
        return parentCategories;
    }

    /**
     * Finds and returns all categories
     * 
     * @return List of all categories
     */
	@Override
	public Page<Category> getAllCategories(int pageNumber, int pageSize, Direction sortDirection, String orderByColumnNm) {
		PageRequest page = new PageRequest(pageNumber, pageSize, sortDirection, orderByColumnNm);
		return catRepo.findAll(page);
	}

	@Override
	public long count() {
		return catRepo.count();
	}

	@Override
	public List<Category> getAllCategoriesOrderByOrderIdAsc(Sort sort) {
		return catRepo.findAll(sort);
	}

	@Override
	public boolean isAbbreviationAvailable(String abbreviation) {
		 Category category = catRepo.findByAbbreviation(abbreviation);
		 if (category != null) {
	            return true;
	     }
		 return false;
	}

	@Override
	public List<Map<String, Object>> getCategoryTree() throws Exception {
		// TODO Auto-generated method stub
		List<Category> categoryList = new ArrayList<>();
		List<Grade> gradeList = new ArrayList<>();
		final int pageNumber = 0;
		final String orderByColumnNm = "orderId";
		final Direction sortDirection = Sort.Direction.ASC;
		
		
		
			if(!((int) (long) categoryService.count() == 0)){
				Page<Category> categoryPage = null;
				categoryPage = categoryService.getAllCategories(pageNumber, (int) (long) categoryService.count(),
						sortDirection, orderByColumnNm);
				categoryList = categoryPage.getContent();	
			}
			
			if(!((int) (long) gradeService.count() == 0)){
				Page<Grade> gradePage = null;
				gradePage = gradeService.getAllGrades(pageNumber, (int) (long) gradeService.count(), sortDirection,
						orderByColumnNm);
				gradeList = gradePage.getContent();
			}
		
		return CommonUtil.generateMapForCategoryTree1(categoryList, gradeList,
				generalSettings.getOrganizationName());
	}

}
