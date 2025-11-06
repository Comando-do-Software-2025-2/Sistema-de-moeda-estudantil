package com.app.sistema_de_moeda.enums;

public enum TipoTransacao {
    ENVIO,              // Professor envia para aluno
    RECEBIMENTO,        // Aluno recebe de professor
    TROCA,              // Aluno troca moedas por vantagem
    PROFESSOR_PARA_ALUNO  // Professor para aluno (mesmo que ENVIO)
}
