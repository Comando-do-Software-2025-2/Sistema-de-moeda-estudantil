package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.MoedasDto;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.services.TransacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {
    private TransacaoService transacaoService;

    @PostMapping
    public ResponseEntity<Aluno> enviarMoedasProfessorParaAluno(@RequestBody MoedasDto moedasDto) {
        Aluno aluno = transacaoService.enviarMoedasProfessorParaAluno(moedasDto);
        return ResponseEntity.ok(aluno);
    }


}
