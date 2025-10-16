package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "empresa_parceiras")
@Getter
@Setter
public class EmpresaParceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, length = 18)
    private String cnpj;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    public EmpresaParceira() {}

    public EmpresaParceira(String nome, String cnpj, String descricao) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.descricao = descricao;
    }

}
