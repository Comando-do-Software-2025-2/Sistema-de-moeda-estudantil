package com.app.sistema_de_moeda.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificacaoEmpresaDTO {
    private String empresaEmail;
    private String empresaNome;
    private String alunoNome;
    private String vantagemTitulo;
    private String codigoCupom;
}
