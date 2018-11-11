package com.smart.service_catalog.service.settings.generalSettings.category.impl;

import java.util.List;

import com.smart.service_catalog.service.settings.generalSettings.category.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.repository.settings.generalSettings.category.GradeRepo;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.CategoryNotFoundException;
import com.smart.service_catalog.service.settings.generalSettings.category.excep.DuplicateCategoryException;

@Transactional
@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    private GradeRepo gradeRepo;
    
    @Override
    public void addGrade(Grade grade) throws DuplicateCategoryException {
        gradeRepo.save(grade);
    }

    @Override
    public Grade getGrade(Integer id) throws CategoryNotFoundException {
        return gradeRepo.findById(id).get();
    }

    @Override
    public void updateGrade(Grade grade) throws CategoryNotFoundException {
        gradeRepo.save(grade);    
    }

    @Override
    public void deleteGrade(Grade grade) throws CategoryNotFoundException {
        gradeRepo.delete(grade);        
    }

    @Override
    public boolean isGradeNameAvailable(String gradeName,  int categoryId) {
        boolean isAvailable = false;
        Grade grade = gradeRepo.findByGradeName(gradeName, categoryId);

        if (grade != null) {
            isAvailable = true;
        }
        return isAvailable;
    }
    
    @Override
    public List<Grade> getSelectedGrades(List<Integer> gradeIdList) {
        return gradeRepo.findSpecificListOfGrades(gradeIdList);
        
    }
    
    @Override
    public List<Grade> getGradesByCategory(Category category) {
        return gradeRepo.findByCategory(category);
        
    }
    
    @Override
    public List<Grade> getAllGrades() {
        // TODO Auto-generated method stub
        return gradeRepo.findAll();
    }
    
    @Override
	public Page<Grade> getAllGrades(int pageNumber, int pageSize, Direction sortDirection, String orderByColumnNm) {
		PageRequest page = new PageRequest(pageNumber, pageSize, sortDirection, orderByColumnNm);
		return gradeRepo.findAll(page);
	}

	@Override
	public long count() {
		return gradeRepo.count();
	}

	@Override
	public List<Grade> findGradeByCategory(Category category) {
		return gradeRepo.findByCategory(category);	
	}

	@Override
	public List<Grade> getAllGradesOrderByOrderIdAsc(Sort sortByOrderIdAsc) {
		return  gradeRepo.findAll(sortByOrderIdAsc);
	}

	@Override
	public boolean isAbbreviationAvailable(String gradeName) {
		// TODO Auto-generated method stub
		  Grade grade = gradeRepo.findByAbbreviation(gradeName);

	        if (grade != null) {
	           return true;
	        }
	        return false;
	}   
	
	@Override
    public boolean isGradeNameAvailable(String gradeName) {
        
        Grade grade = gradeRepo.findByName(gradeName);

        if (grade != null) {
            return  true;
        }
        return false;
    }

    @Override
    public List<Grade> getGradesByCompany(int companyId) {
        return gradeRepo.findbyCategory_Comapny_Id(companyId);
    }


}
