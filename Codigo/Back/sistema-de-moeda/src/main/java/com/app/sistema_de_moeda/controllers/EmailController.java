package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.MoedasRecebidaDTO;
import com.app.sistema_de_moeda.dtos.CupomResgateDTO;
import com.app.sistema_de_moeda.services.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
@Slf4j
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/distribuir-moedas")
    public ResponseEntity<Map<String, Object>> distribuirMoedas(@RequestBody MoedasRecebidaDTO dto) {
        try {
            // Notifica aluno
            emailService.notificarAlunoDistribuicao(
                dto.getAlunoNome(),
                dto.getAlunoEmail(),
                dto.getProfessorNome(),
                dto.getValor(),
                dto.getMotivo()
            );

            // Notifica professor
            emailService.notificarProfessorDistribuicao(
                dto.getProfessorNome(),
                dto.getProfessorEmail(),
                dto.getAlunoNome(),
                dto.getValor(),
                dto.getMotivo()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("sucesso", true);
            response.put("mensagem", "Emails de distribuição de moedas enviados com sucesso");
            response.put("alunoNotificado", dto.getAlunoEmail());
            response.put("professorNotificado", dto.getProfessorEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erro ao enviar emails de distribuição: {}", e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("sucesso", false);
            response.put("mensagem", "Erro ao enviar emails: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/resgatar-vantagem")
    public ResponseEntity<Map<String, Object>> resgatarVantagem(@RequestBody CupomResgateDTO dto) {
        try {
            // Notifica aluno
            emailService.enviarEmailResgateAluno(
                dto.getAlunoNome(),
                dto.getAlunoEmail(),
                dto.getVantagemTitulo(),
                dto.getCodigoCupom(),
                dto.getEmpresaNome(),
                dto.getCustoMoedas()
            );

            // Notifica empresa
            emailService.notificarEmpresaSobreResgate(
                dto.getEmpresaNome(),
                dto.getEmpresaEmail(),
                dto.getVantagemTitulo(),
                dto.getAlunoNome(),
                dto.getAlunoEmail(),
                dto.getCodigoCupom()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("sucesso", true);
            response.put("mensagem", "Emails de resgate enviados com sucesso");
            response.put("codigoResgate", dto.getCodigoCupom());
            response.put("alunoNotificado", dto.getAlunoEmail());
            response.put("empresaNotificada", dto.getEmpresaEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erro ao enviar emails de resgate: {}", e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("sucesso", false);
            response.put("mensagem", "Erro ao enviar emails: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
