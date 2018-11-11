/**
 * <p>
 * Title/Module : Category
 * </p>
 * <p>
 * Description : Repository class of Grade. All the database access queries related to Grade goes here
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
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;

@Repository("gradeRepository")
public interface GradeRepo extends JpaRepository<Grade, Integer> {

    @Query("SELECT g FROM Grade g where LOWER(g.category) = LOWER(:categoryId) and LOWER(g.name) = LOWER(:gradeName) ")
    Grade findByGradeName(@Param("gradeName") String gradeName, @Param("categoryId") int categoryId);

    @Query("SELECT g FROM Grade g WHERE g.id in :gradeIds")
    List<Grade> findSpecificListOfGrades(@Param("gradeIds") List<Integer> gradeIdList);

	List<Grade> findByCategory(Category category);
	
	Grade findByName(@Param("name") String name);
	
	Grade findByAbbreviation(@Param("abbreviation") String abbreviation);

	@Query("select g from Grade as g where g.category.company.id=:id")
	List<Grade> findbyCategory_Comapny_Id(@Param("id") int companyId);
}
