package com.smart.service_catalog.service.impl.settings.generalSettings.company;

import com.smart.service_catalog.model.company.Company;
import com.smart.service_catalog.model.company.TimeZone;
import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import com.smart.service_catalog.model.unit.GradeAssociation;
import com.smart.service_catalog.model.unit.Unit;
import com.smart.service_catalog.repository.settings.generalSettings.company.CompanyRepo;
import com.smart.service_catalog.repository.settings.generalSettings.company.TimeZoneRepo;
import com.smart.service_catalog.repository.unit.UnitRepo;
import com.smart.service_catalog.service.settings.generalSettings.company.CompanyProfileService;
import com.smart.service_catalog.service.settings.generalSettings.hierarchy.UnitLevelService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by CSI on 7/17/2017.
 */
@Transactional
@Service
public class CompanyProfileServiceImpl implements CompanyProfileService {
    @Autowired
    private CompanyRepo companyRepo;

    @Autowired
    private TimeZoneRepo timeZoneRepo;

    @Autowired
    private UnitRepo unitRepo;

    @Autowired
    private UnitLevelService unitLevelService;

    private static Logger logger = LogManager.getLogger();

    @Override
    public Company addCompany(Company company){
        Company retObj= new Company();
        int companyId=company.getId();
        try{
            retObj =companyRepo.saveAndFlush(company);
            if (companyId==0){
                Unit unit =new Unit();
                unit.setName(company.getName());
                unit.setId(0);
                Set<GradeAssociation> grades= new HashSet<>();
                UnitLevel  unitLevel= new UnitLevel();
                unitLevel.setCompany(retObj);
                unitLevel.setName("Organization");
                unitLevel.setId(0);
                unitLevelService.addUnitLevel(unitLevel);
                unit.setUnitLevel(unitLevel);
                unitRepo.saveAndFlush(unit);
            }
        }
        catch (Exception e){
            logger.error("error in adding company",e);
        }
        return  retObj;
    }

    @Override
    public Company getCompany(int id) {
        return companyRepo.findById(id).get();
    }

    @Override
    public List<TimeZone> getAllTimeZones() {
        return timeZoneRepo.findAll();
    }

    @Override
    public void addTimezone(TimeZone timeZone) {
        timeZoneRepo.saveAndFlush(timeZone);
    }
}
