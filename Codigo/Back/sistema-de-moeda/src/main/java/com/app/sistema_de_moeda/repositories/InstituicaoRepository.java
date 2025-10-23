package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
}
