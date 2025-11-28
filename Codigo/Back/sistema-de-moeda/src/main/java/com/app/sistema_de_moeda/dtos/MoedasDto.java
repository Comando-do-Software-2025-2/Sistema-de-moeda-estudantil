package com.app.sistema_de_moeda.dtos;

import java.math.BigDecimal;

public record MoedasDto(
        Long professor_id,
        Long aluno_id,
        BigDecimal valor,
        String motivo
) {
}
