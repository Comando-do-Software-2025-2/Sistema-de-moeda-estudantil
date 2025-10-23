package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.services.InstituicaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instituicoes")
@RequiredArgsConstructor
public class InstituicaoController {
    private final InstituicaoService instituicaoService;

    @PostMapping
    public ResponseEntity<HttpStatus> criarInstituicao(@RequestBody InstituicaoDto instituicaoDto) {
        instituicaoService.criarInstituicao(instituicaoDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Instituicao>> buscarInstituicoes() {
        return ResponseEntity.ok(instituicaoService.buscarInstituicoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> buscarInstituicaoPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoService.buscarPeloId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarInstituicaoPeloId(@PathVariable Long id) {
        instituicaoService.deletarPeloId(id);
        return ResponseEntity.ok().build();
    }

}
