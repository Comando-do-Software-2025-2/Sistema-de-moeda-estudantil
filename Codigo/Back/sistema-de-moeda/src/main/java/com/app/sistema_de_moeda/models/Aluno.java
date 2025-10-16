package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "aluno")
@Getter
@Setter
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;

    @Column(length = 50)
    private String ra;

    @Column(length = 255)
    private String endereco;

    @Column(length = 100)
    private String curso;

    @Column(length = 14)
    private String cpf;

    @Column(name = "saldo_moedas", precision = 10, scale = 2)
    private BigDecimal saldoMoedas;

    public Aluno() {}

    public Aluno(Usuario usuario, Instituicao instituicao, String ra, String endereco, String curso, String cpf, BigDecimal saldoMoedas) {
        this.usuario = usuario;
        this.instituicao = instituicao;
        this.ra = ra;
        this.endereco = endereco;
        this.curso = curso;
        this.cpf = cpf;
        this.saldoMoedas = saldoMoedas;
    }
}
