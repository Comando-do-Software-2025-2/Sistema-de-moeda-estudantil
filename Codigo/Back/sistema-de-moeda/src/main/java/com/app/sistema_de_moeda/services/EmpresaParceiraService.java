package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.EmpresaParceiraDto;
import com.app.sistema_de_moeda.models.EmpresaParceira;
import com.app.sistema_de_moeda.repositories.EmpresaParceiraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaParceiraService {
    private final EmpresaParceiraRepository empresaParceiraRepository;

    public List<EmpresaParceiraDto> buscarEmpresas() {
        return empresaParceiraRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void criarEmpresa(EmpresaParceiraDto empresaDto) {
        EmpresaParceira empresa = new EmpresaParceira(empresaDto.usuario(), empresaDto.cnpj(), empresaDto.descricao());
        empresaParceiraRepository.save(empresa);
    }

    public EmpresaParceiraDto buscarEmpresa(Long id) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        return mapToDto(empresa);
    }

    public void deletarEmpresa(Long id) {
        empresaParceiraRepository.deleteById(id);
    }

    public EmpresaParceiraDto editarEmpresa(Long id, EmpresaParceiraDto empresaDto) {
        EmpresaParceira empresa = empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        empresa.setUsuario(empresa.getUsuario());
        empresa.setDescricao(empresa.getDescricao());
        empresa.setCnpj(empresaDto.cnpj());

        empresa = empresaParceiraRepository.save(empresa);
        return mapToDto(empresa);
    }

    private EmpresaParceiraDto mapToDto(EmpresaParceira empresa) {
        return new EmpresaParceiraDto(empresa.getUsuario(), empresa.getCnpj(), empresa.getDescricao());
    }

}
