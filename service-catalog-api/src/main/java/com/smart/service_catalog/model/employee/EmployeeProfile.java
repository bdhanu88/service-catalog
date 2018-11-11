package com.smart.service_catalog.model.employee;

import com.smart.service_catalog.model.settings.generalSettings.category.Grade;
import com.smart.service_catalog.model.settings.generalSettings.skill.Skill;
import com.smart.service_catalog.model.unit.Unit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by CSI on 8/10/2017.
 */
@Entity
@Table(name = "EMPLOYEE_PROFILE")
public class EmployeeProfile implements Serializable {

    private static final long serialVersionUID = 431978128446682296L;
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private
    int id;

    @Column(name = "EMP_ID")
    private
    String employeeId;

    @Column(name = "NAME")
    private
    String name;

    @Column(name = "ADDRESS")
    private
    String address;

    @Column(name = "NATIONALITY")
    private
    String nationality;

    @Column(name = "EMAIL")
    private
    String email;

    @Column(name = "PHONE_NO")
    private
    String phoneNo;

    @Column(name = "MOBILE_NO")
    private
    String mobileNo;

    @Column(name = "GENDER")
    private
    Gender gender;

    @Column(name = "MARITAL_STATUS")
    private
    MaritalStatus maritalStatus;

    @Column(name = "DATE_OF_BIRTH")
    private
    Date dob;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "EMP_TYPE_ID")
    private
    EmployeeType employeeType;

    @Column(name = "JOINED_DATE")
    private
    Date joinedDate;

    @Column(name = "CONTRACT_END_DATE")
    private
    Date contractEndDate;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "EMP_UNIT_ID")
    private
    Unit unit;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "GRADE_ID")
    private
    Grade grade;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(name = "EMPLOYEE_ACCESSIBLE_UNITS",
            joinColumns ={@JoinColumn(name = "EMP_PROF_ID",referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "UNIT_ID",referencedColumnName = "UNIT_ID")})
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private List<Unit> unitAccess;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(name = "EMPLOYEE_SKILLS",
            joinColumns ={@JoinColumn(name = "EMP_PROF_ID",referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "SKILL_ID",referencedColumnName = "ID")})
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private List<Skill> skills;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
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

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public EmployeeType getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(EmployeeType employeeType) {
        this.employeeType = employeeType;
    }

    public Date getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(Date joinedDate) {
        this.joinedDate = joinedDate;
    }

    public Date getContractEndDate() {
        return contractEndDate;
    }

    public void setContractEndDate(Date contractEndDate) {
        this.contractEndDate = contractEndDate;
    }

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

    public List<Unit> getUnitAccess() {
        return unitAccess;
    }

    public void setUnitAccess(List<Unit> unitAccess) {
        this.unitAccess = unitAccess;
    }

    public enum Gender{
        MALE(1),
        FEMALE(2);
        private int value;
        Gender(int value){
            this.setValue(value);
        }
        public int value(){
            return getValue();
        }

        public int getValue(){
            return value;
        }

        public void setValue(int value){
            this.value = value;
        }
    }
    public enum MaritalStatus{
        MARRIED(1),
        UNMARRIED(2);
        private int value;
        MaritalStatus(int value){
            this.setValue(value);
        }
        public int value(){
            return getValue();
        }

        public int getValue(){
            return value;
        }

        public void setValue(int value){
            this.value = value;
        }
    }

}
