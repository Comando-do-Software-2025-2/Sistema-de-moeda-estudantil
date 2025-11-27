package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.MoedasDto;
import com.app.sistema_de_moeda.dtos.TransacaoDto;
import com.app.sistema_de_moeda.models.Transacao;
import com.app.sistema_de_moeda.services.TransacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {
    private final TransacaoService transacaoService;

    // Enviar moedas de professor para aluno
    @PostMapping
    public ResponseEntity<Transacao> enviarMoedasProfessorParaAluno(@RequestBody MoedasDto moedasDto) {
        try {
            Transacao transacao = transacaoService.enviarMoedasProfessorParaAluno(moedasDto);
            return ResponseEntity.ok(transacao);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/resgate")
    public ResponseEntity<Transacao> resgatarVantagem(@RequestBody TransacaoDto dto) {
        // Note: You might need to adjust TransacaoDto to hold just aluno_id and vantagem_id for this context
        try {
            Transacao transacao = transacaoService.resgatarVantagem(dto.aluno_id(), dto.vantagem().getId());

            // Call email service here using data from 'transacao'

            return ResponseEntity.ok(transacao);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Buscar todas as transações
    @GetMapping
    public ResponseEntity<List<Transacao>> buscarTodasTransacoes() {
        return ResponseEntity.ok(transacaoService.buscarTodasTransacoes());
    }

    // Buscar transação por ID
    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarTransacaoPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(transacaoService.buscarTransacaoPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Buscar transações por aluno
    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<Transacao>> buscarTransacoesPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesPorAluno(alunoId));
    }

    // Buscar transações por professor
    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<Transacao>> buscarTransacoesPorProfessor(@PathVariable Long professorId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesPorProfessor(professorId));
    }

    // Buscar transações recebidas por aluno
    @GetMapping("/aluno/{alunoId}/recebidas")
    public ResponseEntity<List<Transacao>> buscarTransacoesRecebidasPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesRecebidasPorAluno(alunoId));
    }

    // Buscar transações enviadas por professor
    @GetMapping("/professor/{professorId}/enviadas")
    public ResponseEntity<List<Transacao>> buscarTransacoesEnviadasPorProfessor(@PathVariable Long professorId) {
        return ResponseEntity.ok(transacaoService.buscarTransacoesEnviadasPorProfessor(professorId));
    }
}
