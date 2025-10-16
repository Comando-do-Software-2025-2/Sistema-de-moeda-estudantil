package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {
}
