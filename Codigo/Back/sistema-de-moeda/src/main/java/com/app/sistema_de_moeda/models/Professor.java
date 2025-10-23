package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;

    @Size(max = 100)
    private String departamento;

    @Size(max = 14)
    private String cpf;

    @NotNull
    @Digits(integer = 8, fraction = 2)
    private BigDecimal saldoMoedas;

    public Professor() {}

    public Professor(Usuario usuario, Instituicao instituicao, String departamento, String cpf) {
        this.usuario = usuario;
        this.instituicao = instituicao;
        this.departamento = departamento;
        this.cpf = cpf;
        this.saldoMoedas = BigDecimal.valueOf(1000.00);
    }

}
