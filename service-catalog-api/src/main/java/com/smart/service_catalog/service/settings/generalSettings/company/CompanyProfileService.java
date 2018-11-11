package com.smart.service_catalog.service.settings.generalSettings.company;

import com.smart.service_catalog.model.company.Company;
import com.smart.service_catalog.model.company.TimeZone;

import java.util.List;

/**
 * Created by CSI on 7/17/2017.
 */
public interface CompanyProfileService {

    public Company addCompany(Company company);

    public Company getCompany(int id);

    public List<TimeZone> getAllTimeZones();

    public void addTimezone(TimeZone timeZone);
}
