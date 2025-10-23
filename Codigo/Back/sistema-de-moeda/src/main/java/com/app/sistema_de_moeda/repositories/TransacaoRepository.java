package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}
