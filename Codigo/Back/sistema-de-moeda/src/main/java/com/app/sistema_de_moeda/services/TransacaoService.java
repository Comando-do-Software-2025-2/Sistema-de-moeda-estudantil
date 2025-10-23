package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.repositories.TransacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransacaoService {
    private TransacaoRepository transacaoRepository;
}
