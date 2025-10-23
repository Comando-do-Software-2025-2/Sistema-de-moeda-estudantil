package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.enums.TipoTransacao;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.models.Vantagem;

import java.math.BigDecimal;

public record TransacaoDto(
        TipoTransacao tipoTransacao,
        Long professor_id,
        Long aluno_id,
        Vantagem vantagem,
        BigDecimal valorEmMoedas,
        String motivo,
        String codigoValidacao
) {
}
