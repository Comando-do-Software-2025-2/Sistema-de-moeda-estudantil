package com.app.sistema_de_moeda.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.sistema_de_moeda.models.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
