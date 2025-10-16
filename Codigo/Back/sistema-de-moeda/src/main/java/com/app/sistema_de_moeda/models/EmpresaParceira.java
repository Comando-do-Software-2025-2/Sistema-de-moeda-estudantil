package com.app.sistema_de_moeda.models;

import com.app.sistema_de_moeda.models.Usuario;
import jakarta.persistence.*;

@Entity
@Table(name = "empresas_parceiras")
public class EmpresaParceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 18)
    private String cnpj;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    public EmpresaParceira() {}

    public EmpresaParceira(Usuario usuario, String cnpj, String descricao) {
        this.usuario = usuario;
        this.cnpj = cnpj;
        this.descricao = descricao;
    }

}
