package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.AlunoDto;
import com.app.sistema_de_moeda.dtos.UsuarioDto;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.models.Instituicao;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.repositories.AlunoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {
    private final AlunoRepository alunoRepository;
    private final UsuarioService usuarioService;
    private final InstituicaoService instituicaoService;

    public List<Aluno> buscarAlunos() {
        return alunoRepository.findAll();
    }

    public void criarAluno(AlunoDto alunoDto) {
        Usuario usuario = usuarioService.buscarUsuario(alunoDto.usuario_id());
        Instituicao instituicao = instituicaoService.buscarPeloId(alunoDto.instituicao_id());
        Aluno aluno = new Aluno(usuario,
                instituicao, alunoDto.rg(), alunoDto.endereco(), alunoDto.curso(), alunoDto.cpf());
        alunoRepository.save(aluno);
    }

    public Aluno buscarAluno(Long id) {
        return alunoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));
    }

    public void deletarAluno(Long id) {
        alunoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));
        alunoRepository.deleteById(id);
    }

    public Aluno editarAluno(Long id, AlunoDto alunoDto) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com id: " + id));

        Usuario usuario = usuarioService.buscarUsuario(alunoDto.usuario_id());
        Instituicao instituicao = instituicaoService.buscarPeloId(alunoDto.instituicao_id());

        alunoExistente.setUsuario(usuario);
        alunoExistente.setInstituicao(instituicao);
        alunoExistente.setRg(alunoDto.rg());
        alunoExistente.setEndereco(alunoDto.endereco());
        alunoExistente.setCurso(alunoDto.curso());
        alunoExistente.setCpf(alunoDto.cpf());

        alunoRepository.save(alunoExistente);
        return alunoExistente;
    }



}
