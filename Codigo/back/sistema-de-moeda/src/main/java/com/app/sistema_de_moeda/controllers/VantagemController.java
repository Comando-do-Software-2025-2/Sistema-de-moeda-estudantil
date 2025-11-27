package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.VantagemDto;
import com.app.sistema_de_moeda.dtos.ResgatoVantagemDto;
import com.app.sistema_de_moeda.models.Vantagem;
import com.app.sistema_de_moeda.models.EmpresaParceira;
import com.app.sistema_de_moeda.services.VantagemService;
import com.app.sistema_de_moeda.services.EmailService;
import com.app.sistema_de_moeda.repositories.EmpresaParceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vantagens")
@CrossOrigin(origins = "http://localhost:5473", allowCredentials = "true")
public class VantagemController {
    @Autowired
    private VantagemService vantagemService;
    
    @Autowired
    private EmpresaParceiraRepository empresaRepository;
    
    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<VantagemDto> listarVantagens() {
        return vantagemService.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<VantagemDto> criarVantagem(@RequestBody VantagemDto dto) {
        if (dto.empresaParceiraId() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        EmpresaParceira empresa = empresaRepository.findById(dto.empresaParceiraId())
            .orElse(null);
        
        if (empresa == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Vantagem vantagem = new Vantagem();
        vantagem.setTitulo(dto.titulo());
        vantagem.setDescricao(dto.descricao());
        vantagem.setCustoEmMoedas(dto.custoEmMoedas());
        vantagem.setFoto(dto.foto());
        vantagem.setEmpresaParceira(empresa);
        
        Vantagem salvo = vantagemService.save(vantagem);
        return ResponseEntity.ok(toDto(salvo));
    }

    @PostMapping("/{id}/resgatar")
    public ResponseEntity<?> resgatarVantagem(@PathVariable Long id, @RequestBody ResgatoVantagemDto resgate) {
        Vantagem vantagem = vantagemService.findById(id).orElse(null);
        
        if (vantagem == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        // Gerar código de cupom único
        String codigoCupom = "COUP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        vantagem.setCodigoCupom(codigoCupom);
        vantagemService.save(vantagem);
        
        // Enviar email para aluno
        emailService.enviarEmailResgateAluno(
            resgate.nomeAluno(),
            resgate.emailAluno(),
            vantagem.getTitulo(),
            codigoCupom,
            vantagem.getEmpresaParceira().getNomeEmpresa(),
            vantagem.getCustoEmMoedas().intValue(),
            resgate.foto()
        );
        
        // Enviar notificação para empresa
        emailService.notificarEmpresaSobreResgate(
            vantagem.getEmpresaParceira().getNomeEmpresa(),
            vantagem.getEmpresaParceira().getEmail(),
            vantagem.getTitulo(),
            resgate.nomeAluno(),
            resgate.emailAluno(),
            codigoCupom
        );
        
        return ResponseEntity.ok(new java.util.HashMap<String, String>() {{
            put("mensagem", "Vantagem resgatada com sucesso!");
            put("codigoCupom", codigoCupom);
        }});
    }

    private VantagemDto toDto(Vantagem v) {
    return new VantagemDto(
        v.getId(),
        v.getTitulo(),
        v.getDescricao(),
        v.getCustoEmMoedas(),
        v.getFoto(),
        v.getEmpresaParceira() != null ? v.getEmpresaParceira().getNomeEmpresa() : null,
        v.getEmpresaParceira() != null ? v.getEmpresaParceira().getId() : null
    );
    }
}
