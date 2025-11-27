package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.models.Usuario;

public record EmpresaParceiraDto(
        String nomeEmpresa,
        String cnpj,
        String descricao,
        String email
) {
}
