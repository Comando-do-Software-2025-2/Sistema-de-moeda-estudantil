package com.app.sistema_de_moeda.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @Column(length = 1000)
    private String descricao;

    @Column
    @NotNull
    @Positive(message = "O custo deve ser positivo")
    private BigDecimal custo_moedas;
}
