package com.smart.service_catalog.controller;

import com.smart.service_catalog.model.settings.generalSettings.jobType.JobType;
import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;
import com.smart.service_catalog.service.settings.generalSettings.category.CategoryService;
import com.smart.service_catalog.service.settings.generalSettings.job.JobTypeService;
import com.smart.service_catalog.service.settings.generalSettings.skill.SkillService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by CSI on 8/8/2017.
 */
@RestController
@RequestMapping(value = "jobtype")
public class JobTypeRestController {

    private static Logger logger = LogManager.getLogger();

    @Autowired
    private JobTypeService jobTypeService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SkillService skillService;

    @PreAuthorize("hasAuthority('JOB_TYPES_EDIT')")
    @PostMapping(value = "add/jobtype")
    public Map<String, Object> addJobType(@RequestBody Map<String, Object> jobTypeMap) {
        Map<String, Object> retMap = new HashMap<String, Object>();
        try {
            JobType jobType = new JobType();
            jobType.setName((String) jobTypeMap.get("name"));
            jobType.setCategory(categoryService.getCategory((Integer) jobTypeMap.get("category")));
            ArrayList<Integer> optSkillIdList = (ArrayList<Integer>) jobTypeMap.get("optionalSkills");
            ArrayList<Skill> optSkillList = new ArrayList<Skill>();
            ArrayList<Integer> reqSkillIdList = (ArrayList<Integer>) jobTypeMap.get("requiredSkills");
            ArrayList<Skill> reqSkillList = new ArrayList<Skill>();
            for (Integer id : optSkillIdList) {
                optSkillList.add(skillService.getSkillById(id));
            }
            for (Integer id : reqSkillIdList) {
                reqSkillList.add(skillService.getSkillById(id));
            }

            jobType.setId((Integer) jobTypeMap.get("id"));

            jobType.setRequiredSkills(reqSkillList);
            jobType.setOptionalSkills(optSkillList);
            jobTypeService.addJobType(jobType);
            retMap.put("success", true);
            retMap.put("jobTypes", jobTypeService.getAllJobTypes());
        } catch (Exception e) {
            retMap.put("success", false);
            logger.info(e);
        }
        return retMap;
    }

    @PreAuthorize("hasAuthority('JOB_TYPE_VIEW')")
    @GetMapping(value = "getalljobtypes")
    public Map<String, Object> getAllJobTypes(){
        Map<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("jobTypes", jobTypeService.getAllJobTypes());
        return retMap;
    }

    @PreAuthorize("hasAuthority('JOB_TYPE_VIEW')")
    @GetMapping(value = "getjobtypebyid")
    public JobType getJobType(@RequestParam("id") int id){
        Map<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("jobType", jobTypeService.getJobTypeById(id));
        return jobTypeService.getJobTypeById(id);
    }

    @PreAuthorize("hasAuthority('JOB_TYPES_EDIT')")
    @GetMapping(value = "removejobtype")
    public Map<String, Object> removeJobType(@RequestParam("id")int id){
        Map<String, Object> retMap = new HashMap<String, Object>();
        retMap.put("jobTypes", jobTypeService.removeJobType(id));
        return retMap;
    }

    @GetMapping(value = "checkjobtypeexists")
    public Map<String,Object> checkEmpTypeName(@RequestParam("value")String jobTypeName ){
        Map<String,Object> retMap=new HashMap<String,Object>();
        JobType jobType=new JobType();
        if(jobTypeName.trim().length()>0){
            jobType= jobTypeService.getJobTypeByName(jobTypeName) ;
        }
        if(jobType != null){
            retMap.put("success",true);
        }

        else {
            retMap.put("success",false);
        }
        return retMap;
    }
}
