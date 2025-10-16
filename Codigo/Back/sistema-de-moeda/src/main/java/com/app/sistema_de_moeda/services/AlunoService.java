package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.AlunoDto;
import com.app.sistema_de_moeda.repositories.AlunoRepository;
import com.app.sistema_de_moeda.models.Aluno;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {
    private final AlunoRepository alunoRepository;

    public List<AlunoDto> buscarAlunos() {
        List<Aluno> alunos = alunoRepository.findAll();
        return alunos.stream()
                .map(this::setToDto)
                .toList();
    }

    public void criarAluno(AlunoDto alunoDto) {
        Aluno aluno = new Aluno(alunoDto.usuario(),
                alunoDto.instituicao(), alunoDto.ra(), alunoDto.endereco(), alunoDto.curso(), alunoDto.cpf(), alunoDto.saldoMoedas());
        alunoRepository.save(aluno);
    }

    public AlunoDto buscarAluno(Long id) {
        Aluno aluno = alunoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));
        return setToDto(aluno);
    }

    public void deletarAluno(Long id) {
        alunoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));
        alunoRepository.deleteById(id);
    }

    private AlunoDto setToDto(Aluno aluno) {
        return new AlunoDto(
                aluno.getUsuario(),
                aluno.getInstituicao(),
                aluno.getRa(),
                aluno.getEndereco(),
                aluno.getCurso(),
                aluno.getCpf(),
                aluno.getSaldoMoedas()
        );
    }

    public AlunoDto editarAluno(Long id, AlunoDto alunoDto) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com id: " + id));

        alunoExistente.setUsuario(alunoDto.usuario());
        alunoExistente.setInstituicao(alunoDto.instituicao());
        alunoExistente.setRa(alunoDto.ra());
        alunoExistente.setEndereco(alunoDto.endereco());
        alunoExistente.setCurso(alunoDto.curso());
        alunoExistente.setCpf(alunoDto.cpf());
        alunoExistente.setSaldoMoedas(alunoDto.saldoMoedas());

        alunoRepository.save(alunoExistente);
        return setToDto(alunoExistente);
    }



}
