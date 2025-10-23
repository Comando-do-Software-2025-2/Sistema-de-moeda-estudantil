package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.dtos.ProfessorDto;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.repositories.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository professorRepository;

    public Professor buscarProfessorPeloId(Long id) {
        return professorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Instituição não encontrada."));
    }

    public void criarProfessor(ProfessorDto professorDto) {
        Professor professor = new Professor(professorDto.usuario(), professorDto.instituicao(),
                professorDto.departamento(), professorDto.cpf());
        professorRepository.save(professor);
    }

    public void deletarPeloId(Long id) {
        if (buscarProfessorPeloId(id) != null) {
            professorRepository.deleteById(id);
        }
    }

    public List<Professor> buscarProfessores() {
        List<Professor> professores = professorRepository.findAll();
        if (professores.isEmpty()) {
            throw new EntityNotFoundException("Não há instituições cadastradas");
        }
        return professores;
    }

}
