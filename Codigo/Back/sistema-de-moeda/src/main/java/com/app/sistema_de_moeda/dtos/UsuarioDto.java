package com.app.sistema_de_moeda.dtos;

public record UsuarioDto(
    String nome,
    String email,
    String senha,
    String tipoUsuario
) {
}
