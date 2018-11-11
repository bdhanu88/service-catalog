package com.smart.service_catalog.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "com.smart.service_catalog" })
@EnableJpaRepositories("com.smart.service_catalog.repository")
@EntityScan("com.smart.service_catalog")
public class ServiceCatalogApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServiceCatalogApiApplication.class, args);
	}
}
