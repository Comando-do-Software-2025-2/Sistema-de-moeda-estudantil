package com.app.sistema_de_moeda.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendEmailDTO {
    private String destinatario;
    private String assunto;
    private String corpo;
}
