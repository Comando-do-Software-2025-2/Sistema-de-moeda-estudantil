package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.enums.TipoTransacao;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoTransacao tipoTransacao;

    @ManyToOne(optional = false)
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem;

    private BigDecimal valorEmMoedas;

    @Column
    private String motivo;

    @Column
    private String codigoValidacao;

    private LocalDateTime dataTransacao;

    public Transacao() {}

    public Transacao(TipoTransacao tipoTransacao, Professor professor, Aluno aluno, Vantagem vantagem, BigDecimal valorEmMoedas,
                     String motivo, String codigoValidacao) {
        this.tipoTransacao = tipoTransacao;
        this.professor = professor;
        this.aluno = aluno;
        this.vantagem = vantagem;
        this.valorEmMoedas = valorEmMoedas;
        this.motivo = motivo;
        this.codigoValidacao = codigoValidacao;
        this.dataTransacao = LocalDateTime.now();
    }

}
