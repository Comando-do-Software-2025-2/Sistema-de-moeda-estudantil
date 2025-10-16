package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.dtos.UsuarioDto;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public List<UsuarioDto> buscarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList(); // Java 16+, ou .collect(Collectors.toList()) se versão anterior
    }

    public UsuarioDto buscarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + id));
        return toDto(usuario);
    }

    public void criarUsuario(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario(
                usuarioDto.nome(),
                usuarioDto.email(),
                usuarioDto.senha(),
                usuarioDto.tipoUsuario()
        );
        usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado com id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public UsuarioDto editarUsuario(Long id, UsuarioDto usuarioDto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + id));

        usuarioExistente.setNome(usuarioDto.nome());
        usuarioExistente.setEmail(usuarioDto.email());
        usuarioExistente.setSenha(usuarioDto.senha());

        usuarioRepository.save(usuarioExistente);

        return toDto(usuarioExistente);
    }

    private UsuarioDto toDto(Usuario usuario) {
        return new UsuarioDto(
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getTipoUsuario()
        );
    }
}
