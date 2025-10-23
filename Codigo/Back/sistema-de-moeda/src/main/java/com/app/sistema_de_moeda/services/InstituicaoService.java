package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.repositories.InstituicaoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstituicaoService {
    private final InstituicaoRepository instituicaoRepository;

    public Instituicao buscarPeloId(Long id) {
        return instituicaoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Instituição não encontrada."));
    }

    public void criarInstituicao(InstituicaoDto instituicaoDto) {
        Instituicao instituicao = new Instituicao(instituicaoDto.nome(), instituicaoDto.cnpj(), instituicaoDto.endereco());
        instituicaoRepository.save(instituicao);
    }

    public void deletarPeloId(Long id) {
        if (buscarPeloId(id) != null) {
            instituicaoRepository.deleteById(id);
        }
    }

    public List<Instituicao> buscarInstituicoes() {
        List<Instituicao> instituicoes = instituicaoRepository.findAll();
        if (instituicoes.isEmpty()) {
            throw new EntityNotFoundException("Não há instituições cadastradas");
        }
        return instituicoes;
    }
}
