package com.smart.service_catalog.model.unit;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "UNIT_GRADE")
public class GradeAssociation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8287035941860438135L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "UNIT_ID")
	@JsonBackReference
	private Unit unit;

	@JoinColumn(name = "GRADE_ID")
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Grade grade;


	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the unit
	 */
	public Unit getUnit() {
		return unit;
	}

	
	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	
	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	
}
