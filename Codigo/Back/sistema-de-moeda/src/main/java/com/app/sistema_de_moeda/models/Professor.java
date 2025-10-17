package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "professor")
@Getter
@Setter
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;

    @Column(length = 100)
    private String departamento;

    @Column(length = 14)
    private String cpf;

    @Column(name = "saldo_moedas", precision = 10, scale = 2)
    private BigDecimal saldoMoedas;


    public Professor() {}

    public Professor(Usuario usuario, Instituicao instituicao, String departamento, String cpf, BigDecimal saldoMoedas) {
        this.usuario = usuario;
        this.instituicao = instituicao;
        this.departamento = departamento;
        this.cpf = cpf;
        this.saldoMoedas = saldoMoedas;
    }

}
