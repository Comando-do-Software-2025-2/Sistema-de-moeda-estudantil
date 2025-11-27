package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.InstituicaoDto;
import com.app.sistema_de_moeda.dtos.ProfessorDto;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.repositories.ProfessorRepository;
import com.app.sistema_de_moeda.repositories.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final UsuarioService usuarioService;
    private final InstituicaoService instituicaoService;

    @Transactional
    public void adicionarSaldoSemestral() {
        List<Professor> professors = professorRepository.findAll();
        for (Professor prof : professors) {
            BigDecimal saldoAtual = prof.getSaldoMoedas();
            prof.setSaldoMoedas(saldoAtual.add(new BigDecimal("1000.00")));
        }
        professorRepository.saveAll(professors);
    }

    public Professor buscarProfessorPeloId(Long id) {
        return professorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Instituição não encontrada."));
    }

    public void criarProfessor(ProfessorDto professorDto) {
        Usuario usuario = usuarioService.buscarUsuario(professorDto.usuario_id());
        Instituicao instituicao = instituicaoService.buscarPeloId(professorDto.instituicao_id());

        Professor professor = new Professor(usuario, instituicao,
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

    public void salvarProfessor(Professor professor) {
        professorRepository.save(professor);
    }

}
