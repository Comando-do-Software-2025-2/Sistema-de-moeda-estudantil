package com.app.sistema_de_moeda.config;

import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.repositories.InstituicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final InstituicaoRepository instituicaoRepository;

    @Override
    public void run(String... args) throws Exception {
        if (instituicaoRepository.count() == 0) {
            Instituicao inst = new Instituicao("PUC Minas", "1234567800019", "Av. Dom José Gaspar, 500");
            instituicaoRepository.save(inst);
            System.out.println("✅ Instituição padrão criada.");
            System.out.println("📝 Para criar um usuário, faça uma requisição POST para /usuarios com:");
            System.out.println("   { \"nome\": \"Admin\", \"email\": \"admin@puc.br\", \"senha\": \"123456\", \"tipoUsuario\": \"ALUNO\" }");
        }
    }
}