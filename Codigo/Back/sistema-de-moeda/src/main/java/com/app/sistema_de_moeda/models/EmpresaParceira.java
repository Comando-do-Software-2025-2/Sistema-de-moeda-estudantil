package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    @Size(max = 14)
    private String cnpj;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String descricao;

    public EmpresaParceira() {}

    public EmpresaParceira(Usuario usuario, String cnpj, String descricao) {
        this.cnpj = cnpj;
        this.descricao = descricao;
        this.usuario = usuario;
    }

}
