package com.app.sistema_de_moeda.dtos;

import java.math.BigDecimal;

public record MoedasDto(
        BigDecimal valor,
        Long professor_id,
        Long aluno_id,
        String motivo
) {
}
