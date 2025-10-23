package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;

import java.math.BigDecimal;

public record ProfessorDto(
        Usuario usuario,
        Instituicao instituicao,
        String departamento,
        String cpf,
        BigDecimal saldoMoedas
) {
}
