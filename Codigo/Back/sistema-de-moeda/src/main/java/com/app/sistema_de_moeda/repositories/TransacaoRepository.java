package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
    // Buscar transações por aluno
    List<Transacao> findByAlunoIdOrderByDataTransacaoDesc(Long alunoId);
    
    // Buscar transações por professor
    List<Transacao> findByProfessorIdOrderByDataTransacaoDesc(Long professorId);
    
    // Buscar todas as transações ordenadas por data
    List<Transacao> findAllByOrderByDataTransacaoDesc();
    
    // Buscar transações por tipo
    @Query("SELECT t FROM Transacao t WHERE t.aluno.id = :alunoId AND t.tipoTransacao = com.app.sistema_de_moeda.enums.TipoTransacao.PROFESSOR_PARA_ALUNO ORDER BY t.dataTransacao DESC")
    List<Transacao> findTransacoesRecebidasByAluno(@Param("alunoId") Long alunoId);
    
    @Query("SELECT t FROM Transacao t WHERE t.professor.id = :professorId AND t.tipoTransacao = com.app.sistema_de_moeda.enums.TipoTransacao.PROFESSOR_PARA_ALUNO ORDER BY t.dataTransacao DESC")
    List<Transacao> findTransacoesEnviadasByProfessor(@Param("professorId") Long professorId);
}
