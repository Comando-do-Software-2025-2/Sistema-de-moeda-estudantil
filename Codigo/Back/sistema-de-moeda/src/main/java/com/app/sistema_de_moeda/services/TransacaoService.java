package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.MoedasDto;
import com.app.sistema_de_moeda.models.Aluno;
import com.app.sistema_de_moeda.models.Professor;
import com.app.sistema_de_moeda.repositories.ProfessorRepository;
import com.app.sistema_de_moeda.repositories.TransacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransacaoService {
    private TransacaoRepository transacaoRepository;
    private ProfessorService professorService;
    private AlunoService alunoService;

    public Aluno enviarMoedasProfessorParaAluno(MoedasDto moedasDto) {
        BigDecimal valorMoedas = moedasDto.valor();
        Professor professor = professorService.buscarProfessorPeloId(moedasDto.professor_id());
        Aluno aluno = alunoService.buscarAlunoPeloId(moedasDto.aluno_id());

        if (valorMoedas.compareTo(professor.getSaldoMoedas()) > 0) {
            throw new RuntimeException("Saldo insuficiente do professor.");
        }

        BigDecimal saldoMoedasProfessor = professor.getSaldoMoedas();
        BigDecimal saldoMoedasAluno = aluno.getSaldoMoedas();

        professor.setSaldoMoedas(saldoMoedasProfessor.subtract(valorMoedas));
        professorService.salvarProfessor(professor);

        aluno.setSaldoMoedas(saldoMoedasAluno.add(valorMoedas));
        alunoService.salvarAluno(aluno);
        return aluno;
    }

}
