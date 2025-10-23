package com.app.sistema_de_moeda.controllers;

import com.app.sistema_de_moeda.dtos.UsuarioDto;
import com.app.sistema_de_moeda.models.Usuario;
import com.app.sistema_de_moeda.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

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
