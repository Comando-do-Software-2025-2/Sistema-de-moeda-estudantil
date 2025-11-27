package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
    private String cnpj;

    @NotBlank
    private String nomeEmpresa;

    private String descricao;

    @Email
    private String email;

    public EmpresaParceira() {}

    public EmpresaParceira(String nomeEmpresa, String cnpj, String descricao, String email) {
        this.cnpj = cnpj;
        this.descricao = descricao;
        this.nomeEmpresa = nomeEmpresa;
        this.email = email;
    }

}
