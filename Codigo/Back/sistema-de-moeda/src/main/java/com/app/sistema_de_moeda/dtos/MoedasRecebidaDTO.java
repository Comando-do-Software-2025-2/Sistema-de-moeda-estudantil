package com.app.sistema_de_moeda.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoedasRecebidaDTO {
    private String alunoEmail;
    private String alunoNome;
    private String professorNome;
    private String professorEmail;
    private int valor;
    private String motivo;
}
