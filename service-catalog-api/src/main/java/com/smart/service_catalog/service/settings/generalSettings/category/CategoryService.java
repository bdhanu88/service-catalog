package com.smart.service_catalog.service.settings.generalSettings.category;

import java.util.List;
import java.util.Map;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.CategoryNotFoundException;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.DuplicateCategoryException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public interface CategoryService {

    /**
     * Adds new Category to application if category already exists it throws DuplicateCategoryException
     * 
     * @param category
     *            new category to add
     * @throws DuplicateCategoryException
     *             if category already exist
     */
    public void addCategory(Category category) throws DuplicateCategoryException;

    /**
     * Finds and returns category object of provided category id
     * 
     * @param id
     *            id of the category
     * @return A category object
     * @throws CategoryNotFoundException
     */
    public Category getCategory(Integer id) throws CategoryNotFoundException;

    /**
     * Updates Category
     * <p>
     * This method saves category object if it not exist if it exist it will replace current object
     * 
     * @param category
     *            category to be saved
     * @throws CategoryNotFoundException
     */
    public void updateCategory(Category category) throws CategoryNotFoundException;

    /**
     * Deletes a category from system
     * <p>
     * if category is not existing it will throw categoryNotFoundException
     * 
     * @param category
     *            category to delete
     * @throws CategoryNotFoundException
     */
    public void deleteCategory(Category category) throws CategoryNotFoundException;

    /**
     * Finds and returns all categories
     * @param orderbycolumnnm 
     * @param sortdirection 
     * @param i 
     * @param pagenumber 
     * 
     * @return List of all categories
     */
    public Page<Category> getAllCategories(int pagenumber, int i, Direction sortdirection, String orderbycolumnnm);

    /**
     * Finds the Availability of a category name
     * 
     * @param categoryName
     *            Name of the category
     * @return boolean(if category name exist returns true else returns false)
     */
    public boolean isCategoryNameAvailable(final String category,int companyId);

    /**
     * 
     * TODO Method Description as a Single Sentence. 
     * 
     * @return
     */
    public List<Category> getAllCategories(int companyId);
    
    /**
     * Finds list of categories by provided list of category id
     * 
     * @param categoryIdList
     *            List of category id
     * @return List of categories corresponding to provide list of id
     */
    public List<Category> getSelectedCategories(List<Integer> categoryIdList);

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
    public void addDataToCategoryDataMap(String key, Object value);
    
    /**
     * 
     * @return row count on table
     */
	public long count();

	/**
     * Method is to load all the available categories to select when adding a grade
     * 
     * @return A Map of parent Categories
     */
	public Map<String, String> getParentCategoriesMap(int pageNumber, int pageSize, Direction sortDirection,
			String orderByColumnNm);

	public List<Category> getAllCategoriesOrderByOrderIdAsc(Sort sort);
	/**
	 * find the availability of abbreviation
	 * 
	 */
	public boolean isAbbreviationAvailable(String abbreviation);
	
	public List<Map<String,Object>> getCategoryTree() throws Exception;
}
