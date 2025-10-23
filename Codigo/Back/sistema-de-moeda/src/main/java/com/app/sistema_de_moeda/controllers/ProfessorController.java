package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.dtos.ProfessorDto;
import com.app.sistema_de_moeda.models.Instituicao;
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

    @PostMapping
    public ResponseEntity<HttpStatus> criarProfessor(@RequestBody ProfessorDto professorDto) {
        professorService.criarProfessor(professorDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Instituicao>> buscarProfessores() {
        return ResponseEntity.ok(professorService.buscarProfessores());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> buscarProfessorPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(professorService.buscarProfessorPeloId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarProfessorPeloId(@PathVariable Long id) {
        professorService.deletarPeloId(id);
        return ResponseEntity.ok().build();
    }


}
