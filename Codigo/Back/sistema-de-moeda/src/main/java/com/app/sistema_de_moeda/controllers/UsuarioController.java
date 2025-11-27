package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.UsuarioDto;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.services.TokenService;
import com.app.sistema_de_moeda.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioService usuarioService;

    public record DadosTokenJWT(String token, Long id, String nome, String tipo) {}
    public record DadosLogin(String email, String senha) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DadosLogin dados) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        var authentication = authenticationManager.authenticate(authenticationToken);

        var usuario = (Usuario) authentication.getPrincipal();
        var tokenJWT = tokenService.gerarToken(usuario);

        return ResponseEntity.ok(new DadosTokenJWT(
                tokenJWT,
                usuario.getId(),
                usuario.getNome(),
                usuario.getTipoUsuario().toString()
        ));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> buscarUsuarios() {
        return ResponseEntity.ok(usuarioService.buscarUsuarios());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> criarUsuario(@RequestBody UsuarioDto usuarioDto) {
        usuarioService.criarUsuario(usuarioDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.buscarUsuario(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarUsuario(@PathVariable Long id) {
        usuarioService.deletarUsuario(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable Long id, @RequestBody UsuarioDto usuarioDto) {
        return ResponseEntity.ok(usuarioService.editarUsuario(id, usuarioDto));
    }
}
