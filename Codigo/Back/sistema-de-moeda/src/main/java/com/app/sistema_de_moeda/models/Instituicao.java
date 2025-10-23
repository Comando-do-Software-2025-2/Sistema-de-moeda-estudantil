package com.app.sistema_de_moeda.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "instituicao")
@Getter
@Setter
public class Instituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column(length = 14)
    private String cnpj;

    @Column
    private String endereco;


}
