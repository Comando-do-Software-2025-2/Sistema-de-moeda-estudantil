package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;

import java.math.BigDecimal;

public record AlunoDto(
        Long usuario_id,
        Long instituicao_id,
        String rg,
        String endereco,
        String curso,
        String cpf,
        BigDecimal saldoMoedas
) {
}
