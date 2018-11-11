package com.smart.service_catalog.model.employee;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by CSI on 8/11/2017.
 */

@Table(name = "EMPLOYEE_TYPE")
@Entity
public class EmployeeType implements Serializable {
    private static final long serialVersionUID = -6743787155582842566L;
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private
    int id;

    @Column(name = "NAME")
    private
    String name;

    @Column(name = "ABBREVIATION")
    private
    String abbreviation;

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
}
