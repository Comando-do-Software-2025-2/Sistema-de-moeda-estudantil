package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.EmpresaParceiraDto;
import com.app.sistema_de_moeda.services.EmpresaParceiraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas-parceiras")
@RequiredArgsConstructor
public class EmpresaParceiraController {
    private final EmpresaParceiraService empresaParceiraService;

    @GetMapping
    public ResponseEntity<List<EmpresaParceiraDto>> buscarEmpresas() {
        return ResponseEntity.ok(empresaParceiraService.buscarEmpresas());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> criarEmpresa(@RequestBody EmpresaParceiraDto empresaDto) {
        empresaParceiraService.criarEmpresa(empresaDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDto> buscarEmpresa(@PathVariable Long id) {
        return ResponseEntity.ok(empresaParceiraService.buscarEmpresa(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarEmpresa(@PathVariable Long id) {
        empresaParceiraService.deletarEmpresa(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDto> editarEmpresa(@PathVariable Long id, @RequestBody EmpresaParceiraDto empresaDto) {
        return ResponseEntity.ok(empresaParceiraService.editarEmpresa(id, empresaDto));
    }
}
