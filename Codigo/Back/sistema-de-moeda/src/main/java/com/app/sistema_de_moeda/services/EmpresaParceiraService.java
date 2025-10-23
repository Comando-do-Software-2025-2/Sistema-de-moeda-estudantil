package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.EmpresaParceiraDto;
import com.app.sistema_de_moeda.models.EmpresaParceira;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.repositories.EmpresaParceiraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaParceiraService {
    private final EmpresaParceiraRepository empresaParceiraRepository;
    private final UsuarioService usuarioService;

    public List<EmpresaParceira> buscarEmpresas() {
        return empresaParceiraRepository.findAll();
    }

    public void criarEmpresa(EmpresaParceiraDto empresaDto) {
        Usuario usuario = usuarioService.buscarUsuario(empresaDto.usuario_id());
        EmpresaParceira empresa = new EmpresaParceira(usuario, empresaDto.cnpj(), empresaDto.descricao());
        empresaParceiraRepository.save(empresa);
    }

    public EmpresaParceira buscarEmpresa(Long id) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        return empresa;
    }

    public void deletarEmpresa(Long id) {
        empresaParceiraRepository.deleteById(id);
    }

    public EmpresaParceira editarEmpresa(Long id, EmpresaParceiraDto empresaDto) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        Usuario usuario = usuarioService.buscarUsuario(empresaDto.usuario_id());

        empresa.setUsuario(usuario);
        empresa.setDescricao(empresaDto.descricao());
        empresa.setCnpj(empresaDto.cnpj());

        empresaParceiraRepository.save(empresa);
        return empresa;
    }

}
