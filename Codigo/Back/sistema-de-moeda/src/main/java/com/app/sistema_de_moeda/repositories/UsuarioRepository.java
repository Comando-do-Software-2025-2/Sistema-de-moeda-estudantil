package com.app.sistema_de_moeda.repositories;

import com.app.sistema_de_moeda.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
