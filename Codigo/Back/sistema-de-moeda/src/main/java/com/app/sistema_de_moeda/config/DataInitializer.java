package com.app.sistema_de_moeda.config;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.enums.TipoUsuario;
import com.app.sistema_de_moeda.repositories.InstituicaoRepository;
import com.app.sistema_de_moeda.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final InstituicaoRepository instituicaoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        if (instituicaoRepository.count() == 0) {
            Instituicao inst = new Instituicao("PUC Minas", "12.345.678/0001-90", "Av. Dom José Gaspar, 500");
            instituicaoRepository.save(inst);
            System.out.println("Instituição padrão criada.");
        }

        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario("Admin", "admin@puc.br", "123456", TipoUsuario.ALUNO); // Adjust Type/Password as needed
            usuarioRepository.save(admin);
            System.out.println("Usuário admin padrão criado.");
        }
    }
}