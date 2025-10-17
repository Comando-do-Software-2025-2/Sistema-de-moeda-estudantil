package com.app.sistema_de_moeda.models;

import jakarta.persistence.*;

@Entity
@Table(name = "instituicao")
public class Instituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
