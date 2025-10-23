package com.app.sistema_de_moeda.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transacoes")
public class TransacaoController {
    private TransicaoService transicaoService;


}
