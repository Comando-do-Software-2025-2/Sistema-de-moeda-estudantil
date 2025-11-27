package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.enums.TipoTransacao;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
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

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipoTransacao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem;

    @NotNull
    @Positive(message = "O valor da transação deve ser positivo")
    private BigDecimal valorEmMoedas;

    @NotBlank(message = "O motivo não pode ser vazio")
    private String motivo;

    @NotBlank(message = "O código de validação não pode ser vazio")
    private String codigoValidacao;

    @PastOrPresent
    private LocalDateTime dataTransacao;

    @Column(nullable = false)
    private boolean cupomUtilizado = false;

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
