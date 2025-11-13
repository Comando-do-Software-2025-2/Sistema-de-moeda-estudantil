package com.app.sistema_de_moeda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SistemaDeMoedaApplication {
	public static void main(String[] args) {
		SpringApplication.run(SistemaDeMoedaApplication.class, args);
	}
}
