package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByUsuarioId(Long usuarioId);
}
