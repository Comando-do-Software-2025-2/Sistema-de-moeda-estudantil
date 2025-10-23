package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
