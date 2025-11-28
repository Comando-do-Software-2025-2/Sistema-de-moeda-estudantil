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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {
    private final TransacaoService transacaoService;

    // Enviar moedas de professor para aluno
    @PostMapping
    public ResponseEntity<?> enviarMoedasProfessorParaAluno(@RequestBody MoedasDto moedasDto) {
        try {
            Transacao transacao = transacaoService.enviarMoedasProfessorParaAluno(moedasDto);
            return ResponseEntity.ok(transacao);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", e.getMessage()));
        }
    }

    @PostMapping("/resgate")
    public ResponseEntity<Transacao> resgatarVantagem(@RequestBody TransacaoDto dto) {
        try {
            Transacao transacao = transacaoService.resgatarVantagem(dto.aluno_id(), dto.vantagem().getId());
            return ResponseEntity.ok(transacao);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/validar-cupom")
    public ResponseEntity<?> validarCupom(@RequestBody Map<String, Object> payload) {
        try {
            String codigo = (String) payload.get("codigo");
            Long empresaId = Long.valueOf(payload.get("empresaId").toString());

            Transacao transacao = transacaoService.validarCupom(codigo, empresaId);
            return ResponseEntity.ok(Map.of("mensagem", "Cupom validado com sucesso!", "transacao", transacao));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
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
