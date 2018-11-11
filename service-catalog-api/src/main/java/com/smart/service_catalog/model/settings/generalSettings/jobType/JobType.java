package com.smart.service_catalog.model.settings.generalSettings.jobType;

import com.smart.service_catalog.model.settings.generalSettings.category.Category;
import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by CSI on 7/28/2017.
 */
@Entity
@Table(name = "JOB_TYPE")
public class JobType  implements Serializable{

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private
    int id;

    @Column(name = "NAME")
    private
    String name;

    @ManyToMany(cascade = CascadeType.PERSIST,fetch =FetchType.LAZY )
    @JoinTable(name = "JOB_TYPE_REQUIRED_SKILLS",
            joinColumns = {@JoinColumn(name = "JOB_TYPE_ID",referencedColumnName = "ID")},inverseJoinColumns = {@JoinColumn(name = "SKILL_ID",referencedColumnName = "ID")})
    private
    List<Skill> requiredSkills;

    @ManyToMany(cascade = CascadeType.PERSIST,fetch =FetchType.LAZY )
    @JoinTable(name = "JOB_TYPE_OPTIONAL_SKILLS",
            joinColumns = {@JoinColumn(name = "JOB_TYPE_ID",referencedColumnName = "ID")}
            ,inverseJoinColumns = {@JoinColumn(name = "SKILL_ID",referencedColumnName = "ID")})
    private
    List<Skill> optionalSkills;

    @ManyToOne(cascade = CascadeType.PERSIST,fetch =FetchType.LAZY)
    @JoinColumn(name = "CATEGORY")
    private
    Category category;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Skill> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<Skill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public List<Skill> getOptionalSkills() {
        return optionalSkills;
    }

    public void setOptionalSkills(List<Skill> optionalSkills) {
        this.optionalSkills = optionalSkills;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
