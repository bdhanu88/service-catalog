package com.smart.service_catalog.model.settings.generalSettings.skill;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.smart.service_catalog.model.company.Company;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "SKILL_GROUP")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SkillGroup  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4882709339516136876L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;

	@Column(name = "SKILL_GROUP_NAME")
	private String name;

	@Column(name = "ABBREVIATION")
	private String abbreviation;
	
	@OneToMany(mappedBy = "skillGroup", cascade = CascadeType.ALL , fetch = FetchType.LAZY, orphanRemoval = true)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "skillGroup" })
	private List<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

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

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
