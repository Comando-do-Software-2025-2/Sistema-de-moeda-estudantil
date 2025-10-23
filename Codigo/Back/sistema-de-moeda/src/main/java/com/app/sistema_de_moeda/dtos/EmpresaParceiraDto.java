package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.models.Usuario;

public record EmpresaParceiraDto(
        Long usuario_id,
        String cnpj,
        String descricao
) {
}
