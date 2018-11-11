package com.smart.service_catalog.service.settings.generalSettings.category;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.CategoryNotFoundException;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.DuplicateCategoryException;

public interface GradeService {

    public void addGrade(Grade grade) throws DuplicateCategoryException;

    public Grade getGrade(Integer id) throws CategoryNotFoundException;

    public void updateGrade(Grade grade) throws CategoryNotFoundException;

    public void deleteGrade(Grade grade) throws CategoryNotFoundException;
    
    public List<Grade> getAllGrades();

    public Page<Grade> getAllGrades(int pagenumber, int count, Direction sortdirection, String orderbycolumnnm);
    
    public boolean isGradeNameAvailable(String gradeName, int categoryId);
    
    public List<Grade> getSelectedGrades(List<Integer> gradeIdList);
	
	public List<Grade> getGradesByCategory(Category category);

	public long count();

	public List<Grade> findGradeByCategory(Category category);

	public List<Grade> getAllGradesOrderByOrderIdAsc(Sort sortByOrderIdAsc);
	
	public boolean isAbbreviationAvailable(String gradeName);
	
	public boolean isGradeNameAvailable(String gradeName);

	public List<Grade> getGradesByCompany(int companyId);
    
}
