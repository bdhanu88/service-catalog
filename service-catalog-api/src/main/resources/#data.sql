INSERT INTO company (address, company_name) VALUES ('horana rd,colombo', 'Test');

INSERT INTO category (abbreviation , name , order_id, company_id) VALUES ('test','new',0,1),
('p1','payrole',1,1),('n4','new1237',2,1),
('sdfsfsdfsdfsdfsdf','dfdfsdfsdfsdf',14,1),('testdfgdfg','Test Payroll 1',15,1),('iuiyiyi','iyuiyiyi',16,1),
('dfghj,hg','tytiuokjhgfd',17,1),('hkjhgufggj','ioi;gufgkhbkj',18,1);

INSERT INTO employee_type (abbreviation, name)VALUES ('P1','Porter'),('Int1','Interpeter');

INSERT INTO grade (abbreviation,name, order_id , category_id) VALUES ('n1','new',0,2),
('n123','new123',1,3),('p1','payrole 1',0,2),('p123','payrole 123',1,4);

INSERT INTO ROLE (ROLE_NAME) VALUES ('ROLE_ADMIN') , ('ROLE_USER');


INSERT INTO permission VALUES (1,'GENERAL_SETTINGS',1),(2,'GENERAL_SETTINGS_EDIT',1),
(3,'GENERAL_SETTINGS_VIEW',1),(4,'UNIT',4),(5,'UNIT_EDIT',4),(6,'UNIT_VIEW',4),(7,'JOB_TYPES',7),
(8,'JOB_TYPES_EDIT',7),(9,'JOB_TYPE_VIEW',7),(10,'LOCATION_SETTINGS',10),(11,'LOCATION_SETTINGS_VIEW',10),
(12,'LOCATION_SETTINGS_EDIT',10),(13,'CUSTOMER_PROFILE',13),(14,'CUSTOMER_PROFILE_VIEW',13),
(15,'CUSTOMER_PROFILE_EDIT',13),(16,'SIDEBAR',16),(17,'DASHBOARD',16),(18,'REPORTS',16),
(19,'NOTIFICATIONS',16),(20,'EMPLOYEE',20),(21,'EMPLOYEE_PROFILE_VIEW',20),(22,'EMPLOYEE_PROFILE_EDIT',20),
(23,'EMPLOYEE_STATUS',23),(24,'EMPLOYEE_STATUS_VIEW',23),(25,'EMPLOYEE_STATUS_EDIT',23),(26,'DEPARTMENT',26),
(27,'DEPARTMENT_VIEW',26),(28,'DEPARTMENT_EDIT',26),(29,'EMPLOYEE_WORK_TIMELINE',29),(30,'EMPLOYEE_WORK_TIMELINE_VIEW',29),
(31,'EMPLOYEE_WORK_TIMELINE_EDIT',29),(32,'EMPLOYEE_PRODUCTIVITY',16),(33,'CATEGORY',33),(34,'CATEGORY_VIEW',33),
(35,'CATEGORY_EDIT',33),(36,'SKILL',36),(37,'SKILL_VIEW',36),(38,'SKILL_EDIT',36),(39,'EMPLOYEE_TYPE',39),
(40,'EMPLOYEE_TYPE_VIEW',39),(41,'EMPLOYEE_TYPE_EDIT',39),(42,'JOB_LIST',42),(43,'JOB_LIST_VIEW',42),
(44,'JOB_LIST_EDIT',42),(45,'GRADE',45),(46,'GRADE_VIEW',45),(47,'GRADE_EDIT',45),(48,'JOB_STATUS',48),
(49,'JOB_STATUS_VIEW',48),(50,'JOB_STATUS_EDIT',48),(51,'ACCESS_CONTROL',51),(52,'ROLE_VIEW',51),(53,'ROLE_EDIT',51)



INSERT INTO employee ( email,enabled,first_name,last_password_reset_date,last_name,password,user_name,role_id,address,contract_end_date,date_of_birth,emp_id,gender,
joined_date,marital_status,mobile_no,name,nationality,phone_no,emp_type_id,grade_id,is_employee) values
('admin@admin.com',1,'admin',NULL,'admin','$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi','admin',1,
'dsd','2017-09-07 15:36:18','2017-08-22 15:36:27','e1',0,'2017-08-10 15:36:40',0,'3123123','admin','fsf','123456',1,2,1),
('enabled@user.com',1,'user','2017-07-25 11:20:16','user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
'user',2,'ds','2017-08-08 15:36:15','2017-08-30 15:36:24','e2',0,'2017-08-17 15:36:42',0,'3123123','user','fsf',NULL,1,3,1),
('disabled@user.com',1,'user','2017-07-25 11:20:16','user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
'disabled',2,'dsd','2017-08-22 15:36:20','2017-08-01 15:36:22','e3',0,'2017-08-16 15:36:44',1,'3123123','user','fsf',NULL,1,4,1);