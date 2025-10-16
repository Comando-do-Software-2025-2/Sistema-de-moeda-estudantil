package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;

import java.math.BigDecimal;

public record AlunoDto(
        Usuario usuario,
        Instituicao instituicao,
        String ra,
        String endereco,
        String curso,
        String cpf,
        BigDecimal saldoMoedas
) {
}
