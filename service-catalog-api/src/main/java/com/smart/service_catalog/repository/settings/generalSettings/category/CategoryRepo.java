/**
 * <p>
 * Title/Module : Category
 * </p>
 * <p>
 * Description : Repository class of Category. All the database access queries related to category goes here
 * </p>
 * 
 * @date : YYYY-MM-DD
 * @author :
 * @version : 1.0 Copyright (c) 2015-2016 Caresystems, Inc. All Rights Reserved.
 */
package com.smart.service_catalog.repository.settings.generalSettings.category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;

@Repository("categoryRepository")
public interface CategoryRepo extends JpaRepository<Category, Integer> {

    @Query("SELECT c FROM Category c WHERE LOWER(c.name) = LOWER(:name) AND c.company.id=:companyId")
    Category findByCategoryName(@Param("name") String categoryName,@Param("companyId")int companyId);

    @Query("SELECT c FROM Category c WHERE c.id in :categoryIds")
    List<Category> findSpecificListOfCategories(@Param("categoryIds") List<Integer> categoryIdList);

    Category findByAbbreviation(@Param("abbreviation") String abbreviation);

    @Query("SELECT c FROM Category c WHERE c.company.id =:companyId ")
    List<Category> getAllCategoriesByCompanyId(@Param("companyId") int companyId);
}
