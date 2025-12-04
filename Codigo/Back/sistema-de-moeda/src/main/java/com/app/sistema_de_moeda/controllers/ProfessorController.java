package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.dtos.ProfessorDto;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.services.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professores")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService professorService;

    @PostMapping("/adicionar-saldo-semestral")
    public ResponseEntity<String> adicionarSaldoSemestral() {
        professorService.adicionarSaldoSemestral();
        return ResponseEntity.ok("Saldo de 1000 moedas adicionado a todos os professores.");
    }

    @PostMapping
    public ResponseEntity<HttpStatus> criarProfessor(@RequestBody ProfessorDto professorDto) {
        professorService.criarProfessor(professorDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Professor>> buscarProfessores() {
        return ResponseEntity.ok(professorService.buscarProfessores());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscarProfessorPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(professorService.buscarProfessorPeloId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Professor> buscarProfessorPorUsuarioId(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(professorService.buscarProfessorPorUsuarioId(usuarioId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarProfessorPeloId(@PathVariable Long id) {
        professorService.deletarPeloId(id);
        return ResponseEntity.ok().build();
    }


}
