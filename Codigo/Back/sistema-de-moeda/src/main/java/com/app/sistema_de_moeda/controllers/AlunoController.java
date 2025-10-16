package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.services.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alunos")
@RequiredArgsConstructor
public class AlunoController {
    private final AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoDto>> buscarAlunos() {
        return ResponseEntity.ok(alunoService.buscarAlunos());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> criarAluno(@RequestBody AlunoDto alunoDto) {
        alunoService.criarAluno(alunoDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDto> buscarAluno(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.buscarAluno(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarAluno(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.deletarAluno(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDto> editarAluno(@PathVariable Long id, @RequestBody AlunoDto alunoDto) {
        alunoService.editarAluno(id, alunoDto);
    }

}
