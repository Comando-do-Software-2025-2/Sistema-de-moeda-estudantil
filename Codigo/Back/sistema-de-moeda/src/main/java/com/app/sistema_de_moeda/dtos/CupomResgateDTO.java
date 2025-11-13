package com.app.sistema_de_moeda.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CupomResgateDTO {
    private String alunoEmail;
    private String alunoNome;
    private String empresaNome;
    private String empresaEmail;
    private String vantagemTitulo;
    private String codigoCupom;
    private Integer custoMoedas;
}
