package com.smart.service_catalog.controller;

import com.smart.service_catalog.model.company.Company;
import com.smart.service_catalog.model.company.TimeZone;
import com.smart.service_catalog.service.settings.generalSettings.company.CompanyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by CSI on 7/14/2017.
 */
@RestController
@RequestMapping(value = "company")
public class CompanyProfileController {
    @Autowired
    CompanyProfileService companyProfileService;


    @PostMapping(value = "addCompany")
    public Map<String, Object> addCompany(@RequestBody Company company) {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        companyProfileService.addCompany(company);
        return returnMap;

    }

    @GetMapping(value = "getcompany")
    public Map<String, Object> getCompanyDetail(@RequestParam(value = "id", defaultValue = "1") int id) {
        Company company = companyProfileService.getCompany(id);
        HashMap<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("companyObj", company);
        return retMap;
    }

    @GetMapping(value = "getalltimezone")
    public Map<String, Object> getTimeZones() {
        List<TimeZone> timeZones = companyProfileService.getAllTimeZones();
        Map<String, Object> objectMap = new HashMap<String, Object>();
        objectMap.put("zoneList", timeZones);
        objectMap.put("weekdays", Company.WeekDays.values());
        return objectMap;
    }

}
