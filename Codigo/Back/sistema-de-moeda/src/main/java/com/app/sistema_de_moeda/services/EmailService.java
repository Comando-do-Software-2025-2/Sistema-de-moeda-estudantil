package com.app.sistema_de_moeda.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void notificarAlunoDistribuicao(String nomeAluno, String emailAluno, String nomeProfessor, Integer quantidade, String motivo) {
        try {
            Context context = new Context();
            context.setVariable("nomeAluno", nomeAluno);
            context.setVariable("nomeProfessor", nomeProfessor);
            context.setVariable("quantidade", quantidade);
            context.setVariable("motivo", motivo);

            String htmlContent = templateEngine.process("distribuicao-aluno-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom("kaiomayer2005@gmail.com");
            helper.setTo(emailAluno);
            helper.setSubject("Parabéns! Você recebeu moedas! - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Email de distribuição enviado para aluno: {}", emailAluno);
        } catch (MessagingException e) {
            log.error("Erro ao enviar email de notificação para o aluno: {}", e.getMessage());
        }
    }

    @Async
    public void notificarProfessorDistribuicao(String nomeProfessor, String emailProfessor, String nomeAluno, Integer quantidade, String motivo) {
        try {
            Context context = new Context();
            context.setVariable("nomeProfessor", nomeProfessor);
            context.setVariable("nomeAluno", nomeAluno);
            context.setVariable("quantidade", quantidade);
            context.setVariable("motivo", motivo);

            String htmlContent = templateEngine.process("distribuicao-professor-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            
            helper.setFrom("kaiomayer2005@gmail.com");
            helper.setTo(emailProfessor);
            helper.setSubject("Envio de moedas confirmado - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Email de confirmação enviado para professor: {}", emailProfessor);
        } catch (MessagingException e) {
            log.error("Erro ao enviar email de confirmação para o professor: {}", e.getMessage());
        }
    }

    @Async
    public void enviarEmailResgateAluno(String nomeAluno, String emailAluno, String nomeVantagem, String codigoResgate, String nomeEmpresa, Integer custoMoedas, String fotoUrl) {
        try {
            Context context = new Context();
            context.setVariable("nomeAluno", nomeAluno);
            context.setVariable("nomeVantagem", nomeVantagem);
            context.setVariable("codigoResgate", codigoResgate);
            context.setVariable("custoMoedas", custoMoedas);
            context.setVariable("nomeEmpresa", nomeEmpresa);

            String qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="
                    + URLEncoder.encode(codigoResgate, StandardCharsets.UTF_8);

            context.setVariable("qrCodeUrl", qrCodeUrl);

            String htmlContent = templateEngine.process("resgate-aluno-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom("kaiomayer2005@gmail.com");
            helper.setTo(emailAluno);
            helper.setSubject("Você resgatou uma vantagem! - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Email de resgate enviado para aluno: {}", emailAluno);
        } catch (MessagingException e) {
            log.error("Erro ao enviar email de resgate para o aluno: {}", e.getMessage());
        }
    }

    @Async
    public void notificarEmpresaSobreResgate(String nomeEmpresa, String emailEmpresa, String nomeVantagem, String nomeAluno, String emailAluno, String codigoResgate) {
        try {
            Context context = new Context();
            context.setVariable("nomeEmpresa", nomeEmpresa);
            context.setVariable("nomeVantagem", nomeVantagem);
            context.setVariable("nomeAluno", nomeAluno);
            context.setVariable("emailAluno", emailAluno);
            context.setVariable("codigoResgate", codigoResgate);

            String htmlContent = templateEngine.process("notificacao-empresa-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            
            helper.setFrom("kaiomayer2005@gmail.com");
            helper.setTo(emailEmpresa);
            helper.setSubject("Nova Vantagem Resgatada - S.G.M.E");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Email de resgate enviado para empresa: {}", emailEmpresa);
        } catch (MessagingException e) {
            log.error("Erro ao enviar email de resgate para a empresa: {}", e.getMessage());
        }
    }
}
