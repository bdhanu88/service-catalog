package com.smart.service_catalog.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

	@RequestMapping(value = "/test", method= RequestMethod.GET)
	public String home() {
		
		System.out.println("Hello From Controller ,.......");
		return "Hello From ControllerRsasasasdt ";
	}
}
