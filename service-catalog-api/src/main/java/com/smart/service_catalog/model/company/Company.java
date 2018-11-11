package com.smart.service_catalog.model.company;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by CSI on 7/14/2017.
 */
@Entity
@Table(name = "COMPANY")
public class Company implements Serializable {


    public WeekDays getWeekStartDay() {
        return weekStartDay;
    }

    public void setWeekStartDay(WeekDays weekStartDay) {
        this.weekStartDay = weekStartDay;
    }

    public enum WeekDays{
        SUNDAY("sunday"),
        MONDAY("monday"),
        TUESDAY("tuesday"),
        WEDNESDAY("wednesday"),
        THURSDAY("thursday"),
        FRIDAY("friday"),
        SATURDAY("saturday");

        private String value;
        WeekDays(String value){
            this.setValue(value);
        }
        public String value(){
            return getValue();
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    private static final long serialVersionUID = 1361177197515460025L;
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private
    int id;

    @Column(name = "COMPANY_NAME")
    private
    String name;

    @Column(name = "ADDRESS")
    private
    String address;

    @Column(name = "COUNTRY")
    private
    String country;

    @Column(name = "PHONE_NO")
    private
    String phoneNo;

    @Column(name = "TIME_ZONE")
    private
    int timeZone;

    @Column(name = "TIME_FORMAT")
    private
    int timeFormat;

    @Column(name = "OPERATIONAL_HOURS")
    private
    double operationalHours;

    @Column(name = "LICENSE_NO")
    private
    int licenseNo;

    @Column(name = "VALID_DATE")
    private
    Date validDate;

    @Column(name = "WEEK_START_DAY")
    private
    WeekDays weekStartDay;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public int getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(int timeZone) {
        this.timeZone = timeZone;
    }

    public int getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(int timeFormat) {
        this.timeFormat = timeFormat;
    }

    public double getOperationalHours() {
        return operationalHours;
    }

    public void setOperationalHours(double operationalHours) {
        this.operationalHours = operationalHours;
    }

    public int getLicenseNo() {
        return licenseNo;
    }

    public void setLicenseNo(int licenseNo) {
        this.licenseNo = licenseNo;
    }

    public Date getValidDate() {
        return validDate;
    }

    public void setValidDate(Date validDate) {
        this.validDate = validDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Company company = (Company) o;
        return id == company.id &&
                timeZone == company.timeZone &&
                timeFormat == company.timeFormat &&
                Double.compare(company.operationalHours, operationalHours) == 0 &&
                licenseNo == company.licenseNo &&
                Objects.equals(name, company.name) &&
                Objects.equals(address, company.address) &&
                Objects.equals(country, company.country) &&
                Objects.equals(phoneNo, company.phoneNo) &&
                Objects.equals(validDate, company.validDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, country, phoneNo, timeZone, timeFormat, operationalHours, licenseNo, validDate);
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", country='" + country + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", timeZone=" + timeZone +
                ", timeFormat=" + timeFormat +
                ", operationalHours=" + operationalHours +
                ", licenseNo=" + licenseNo +
                ", validDate=" + validDate +
                '}';
    }
}
