package com.smart.service_catalog.model.unit;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.smart.service_catalog.model.settings.generalSettings.hierarchy.UnitLevel;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "UNIT")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler" , "parentUnit, unitLevel"})
public class Unit implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 968557432426370935L;

    @Id
    @Column(name = "UNIT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_UNIT_ID")
    private Unit parentUnit;

    @NotEmpty
    @Column(name = "NAME")
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UNIT_LEVEL_ID")
    private UnitLevel unitLevel;

    @Column(name = "ABBREVIATION")
    private String abbreviation;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Unit getParentUnit() {
        return parentUnit;
    }

    public void setParentUnit(Unit parentUnit) {
        this.parentUnit = parentUnit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UnitLevel getUnitLevel() {
        return unitLevel;
    }

    public void setUnitLevel(UnitLevel unitLevel) {
        this.unitLevel = unitLevel;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((abbreviation == null) ? 0 : abbreviation.hashCode());
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((unitLevel == null) ? 0 : unitLevel.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Unit other = (Unit) obj;
        if (abbreviation == null) {
            if (other.abbreviation != null)
                return false;
        } else if (!abbreviation.equals(other.abbreviation))
            return false;
        if (id != other.id)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (unitLevel == null) {
            if (other.unitLevel != null)
                return false;
        } else if (!unitLevel.equals(other.unitLevel))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Unit [id=" + id + ", name=" + name + ", unitLevel=" + unitLevel + ", abbreviation=" + abbreviation
                + "]";
    }
}
