package com.smart.service_catalog.model.settings.generalSettings.category;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.proxy.HibernateProxyHelper;
import org.hibernate.validator.constraints.NotEmpty;

import com.smart.service_catalog.view.View;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table(name = "GRADE")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Grade implements Serializable {

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
	        return true;
	    }

	    if (obj == null) {
	        return false;
	    }

	    Class<?> objClass = HibernateProxyHelper.getClassWithoutInitializingProxy(obj);
	    if (this.getClass() != objClass) {
	        return false;
	    }
	    return id == ((Grade) obj).getId();
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 2132033958857384443L;

	@Id
	@Column(name = "GRADE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(View.Grade.class)
	private int id;

	@Column(name = "ORDER_ID")
	@JsonView(View.Grade.class)
	private int orderId;

	@NotEmpty
	@Column(name = "NAME")
	@JsonView(View.Grade.class)
	private String name;

	@Column(name = "ABBREVIATION")
	@JsonView(View.Grade.class)
	private String abbreviation;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CATEGORY_ID")
	@OrderBy("id")
	@JsonView(View.Grade.class)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Category category;

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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

}
