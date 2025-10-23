package com.app.sistema_de_moeda.dtos;

import com.app.sistema_de_moeda.enums.TipoUsuario;

public record UsuarioDto(
    String nome,
    String email,
    String senha,
    TipoUsuario tipoUsuario
) {
}
