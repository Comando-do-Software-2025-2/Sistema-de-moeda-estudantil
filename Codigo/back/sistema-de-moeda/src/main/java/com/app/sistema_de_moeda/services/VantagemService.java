package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.models.Vantagem;
import com.app.sistema_de_moeda.repositories.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VantagemService {
    @Autowired
    private VantagemRepository vantagemRepository;

    public List<Vantagem> findAll() {
        return vantagemRepository.findAll();
    }

    public Optional<Vantagem> findById(Long id) {
        return vantagemRepository.findById(id);
    }

    public Vantagem save(Vantagem vantagem) {
        return vantagemRepository.save(vantagem);
    }
}
