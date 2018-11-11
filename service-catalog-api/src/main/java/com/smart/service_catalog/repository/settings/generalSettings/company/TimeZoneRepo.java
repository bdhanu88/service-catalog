package com.smart.service_catalog.repository.settings.generalSettings.company;

import com.smart.service_catalog.model.company.TimeZone;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by CSI on 7/20/2017.
 */
public interface TimeZoneRepo extends JpaRepository<TimeZone,Integer> {

}
