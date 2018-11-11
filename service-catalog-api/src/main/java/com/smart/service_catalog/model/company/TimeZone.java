package com.smart.service_catalog.model.company;

import javax.persistence.*;

/**
 * Created by CSI on 7/20/2017.
 */
@Entity
@Table(name = "TIMEZONE")
public class TimeZone {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private
    int id;

    @Column(name = "COUNTRY")
    private
    String country;

    @Column(name = "OFFSET")
    private
    String offset;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getOffset() {
        return offset;
    }

    public void setOffset(String offset) {
        this.offset = offset;
    }


}
