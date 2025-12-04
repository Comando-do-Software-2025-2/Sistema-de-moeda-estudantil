package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.MoedasDto;
import com.app.sistema_de_moeda.dtos.TransacaoDto;
import com.app.sistema_de_moeda.enums.TipoTransacao;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.models.Transacao;
import com.app.sistema_de_moeda.models.Vantagem;
import com.app.sistema_de_moeda.repositories.TransacaoRepository;
import com.app.sistema_de_moeda.repositories.VantagemRepository;
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
    private final EmailService emailService;
    private final VantagemRepository vantagemRepository;

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

        Transacao savedTransacao = transacaoRepository.save(transacao);

        // Enviar emails de notificação
        try {
            // Notifica aluno sobre recebimento de moedas
            emailService.notificarAlunoDistribuicao(
                    aluno.getUsuario().getNome(),
                    aluno.getUsuario().getEmail(),
                    professor.getUsuario().getNome(),
                    valorMoedas.intValue(),
                    moedasDto.motivo()
            );

            // Notifica professor sobre envio de moedas
            emailService.notificarProfessorDistribuicao(
                    professor.getUsuario().getNome(),
                    professor.getUsuario().getEmail(),
                    aluno.getUsuario().getNome(),
                    valorMoedas.intValue(),
                    moedasDto.motivo()
            );
        } catch (Exception e) {
            System.err.println("Erro ao enviar emails de distribuição de moedas: " + e.getMessage());
            // Não falha a transação se o email falhar
        }

        return savedTransacao;
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

    @Transactional
    public Transacao resgatarVantagem(Long alunoId, Long vantagemId) {
        Aluno aluno = alunoService.buscarAlunoPeloId(alunoId);
        Vantagem vantagem = vantagemRepository.findById(vantagemId)
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));

        BigDecimal custo = vantagem.getCustoEmMoedas();

        // 1. Check Balance
        if (aluno.getSaldoMoedas().compareTo(custo) < 0) {
            throw new RuntimeException("Saldo insuficiente para resgatar esta vantagem.");
        }

        // 2. Deduct Balance
        aluno.setSaldoMoedas(aluno.getSaldoMoedas().subtract(custo));
        alunoService.salvarAluno(aluno);

        // 3. Create Transaction
        Transacao transacao = new Transacao();
        transacao.setTipoTransacao(TipoTransacao.TROCA);
        transacao.setAluno(aluno);
        // Professor is null in exchange
        transacao.setVantagem(vantagem);
        transacao.setValorEmMoedas(custo);
        transacao.setMotivo("Resgate de vantagem: " + vantagem.getTitulo());
        String codigo = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        transacao.setCodigoValidacao(codigo);
        transacao.setDataTransacao(LocalDateTime.now());

        Transacao savedTransacao = transacaoRepository.save(transacao);

        // 4. Trigger Emails (Simulating Async Event)
        try {
            // Notify Student
            emailService.enviarEmailResgateAluno(
                    aluno.getUsuario().getNome(),
                    aluno.getUsuario().getEmail(),
                    vantagem.getTitulo(),
                    codigo,
                    vantagem.getEmpresaParceira().getNomeEmpresa(),
                    custo.intValue(),
                    vantagem.getFoto()
            );

            // Notify Company with correct email from the linked EmpresaParceira
            emailService.notificarEmpresaSobreResgate(
                    vantagem.getEmpresaParceira().getNomeEmpresa(),
                    vantagem.getEmpresaParceira().getEmail(),
                    vantagem.getTitulo(),
                    aluno.getUsuario().getNome(),
                    aluno.getUsuario().getEmail(),
                    codigo
            );
        } catch (Exception e) {
            System.err.println("Erro ao enviar emails de resgate: " + e.getMessage());
            // Don't fail transaction if email fails
        }

        return savedTransacao;
    }

    @Transactional
    public Transacao validarCupom(String codigo, Long empresaId) {
        Transacao transacao = transacaoRepository.findByCodigoValidacao(codigo)
                .orElseThrow(() -> new RuntimeException("Cupom inválido ou inexistente."));

        if (transacao.isCupomUtilizado()) {
            throw new RuntimeException("Este cupom já foi utilizado.");
        }

        if (!transacao.getVantagem().getEmpresaParceira().getId().equals(empresaId)) {
            throw new RuntimeException("Este cupom não pertence a uma vantagem desta empresa.");
        }

        transacao.setCupomUtilizado(true);
        return transacaoRepository.save(transacao);
    }
}
