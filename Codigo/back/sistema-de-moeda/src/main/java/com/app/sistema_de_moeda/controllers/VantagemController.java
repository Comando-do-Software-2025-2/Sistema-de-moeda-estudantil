package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.VantagemDto;
import com.app.sistema_de_moeda.models.Vantagem;
import com.app.sistema_de_moeda.services.VantagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vantagens")
@CrossOrigin(origins = "http://localhost:5473", allowCredentials = "true")
public class VantagemController {
    @Autowired
    private VantagemService vantagemService;

    @GetMapping
    public List<VantagemDto> listarVantagens() {
        return vantagemService.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<VantagemDto> criarVantagem(@RequestBody VantagemDto dto) {
        Vantagem vantagem = new Vantagem();
        vantagem.setTitulo(dto.titulo());
        vantagem.setDescricao(dto.descricao());
        vantagem.setCustoEmMoedas(dto.custoEmMoedas());
        vantagem.setFoto(dto.foto());
        Vantagem salvo = vantagemService.save(vantagem);
        return ResponseEntity.ok(toDto(salvo));
    }

    private VantagemDto toDto(Vantagem v) {
    return new VantagemDto(
        v.getId(),
        v.getTitulo(),
        v.getDescricao(),
        v.getCustoEmMoedas(),
        v.getFoto(),
        null  // empresaNome
    );
    }
}
