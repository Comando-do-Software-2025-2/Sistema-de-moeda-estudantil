package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.MoedasDto;
import com.app.sistema_de_moeda.dtos.TransacaoDto;
import com.app.sistema_de_moeda.enums.TipoTransacao;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.models.Transacao;
import com.app.sistema_de_moeda.repositories.TransacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransacaoService {
    private final TransacaoRepository transacaoRepository;
    private final ProfessorService professorService;
    private final AlunoService alunoService;

    @Transactional
    public Transacao enviarMoedasProfessorParaAluno(MoedasDto moedasDto) {
        BigDecimal valorMoedas = moedasDto.valor();
        Professor professor = professorService.buscarProfessorPeloId(moedasDto.professor_id());
        Aluno aluno = alunoService.buscarAlunoPeloId(moedasDto.aluno_id());

        // Validar saldo do professor
        if (valorMoedas.compareTo(professor.getSaldoMoedas()) > 0) {
            throw new RuntimeException("Saldo insuficiente do professor.");
        }

        // Validar valor positivo
        if (valorMoedas.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("O valor deve ser positivo.");
        }

        // Atualizar saldos
        BigDecimal saldoMoedasProfessor = professor.getSaldoMoedas();
        BigDecimal saldoMoedasAluno = aluno.getSaldoMoedas();

        professor.setSaldoMoedas(saldoMoedasProfessor.subtract(valorMoedas));
        professorService.salvarProfessor(professor);

        aluno.setSaldoMoedas(saldoMoedasAluno.add(valorMoedas));
        alunoService.salvarAluno(aluno);

        // Criar registro da transação
        Transacao transacao = new Transacao();
        transacao.setTipoTransacao(TipoTransacao.PROFESSOR_PARA_ALUNO);
        transacao.setProfessor(professor);
        transacao.setAluno(aluno);
        transacao.setVantagem(null); // Não tem vantagem nesse tipo de transação
        transacao.setValorEmMoedas(valorMoedas);
        transacao.setMotivo(moedasDto.motivo());
        transacao.setCodigoValidacao(UUID.randomUUID().toString());
        transacao.setDataTransacao(LocalDateTime.now());

        return transacaoRepository.save(transacao);
    }

    // Buscar todas as transações
    public List<Transacao> buscarTodasTransacoes() {
        return transacaoRepository.findAllByOrderByDataTransacaoDesc();
    }

    // Buscar transações por aluno
    public List<Transacao> buscarTransacoesPorAluno(Long alunoId) {
        return transacaoRepository.findByAlunoIdOrderByDataTransacaoDesc(alunoId);
    }

    // Buscar transações por professor
    public List<Transacao> buscarTransacoesPorProfessor(Long professorId) {
        return transacaoRepository.findByProfessorIdOrderByDataTransacaoDesc(professorId);
    }

    // Buscar transações recebidas pelo aluno
    public List<Transacao> buscarTransacoesRecebidasPorAluno(Long alunoId) {
        return transacaoRepository.findTransacoesRecebidasByAluno(alunoId);
    }

    // Buscar transações enviadas pelo professor
    public List<Transacao> buscarTransacoesEnviadasPorProfessor(Long professorId) {
        return transacaoRepository.findTransacoesEnviadasByProfessor(professorId);
    }

    // Buscar transação por ID
    public Transacao buscarTransacaoPorId(Long id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada com ID: " + id));
    }
}
