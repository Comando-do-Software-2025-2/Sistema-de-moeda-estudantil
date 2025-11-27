package com.app.sistema_de_moeda.services;

import com.app.sistema_de_moeda.models.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class TokenService {

    // Em produção, isso deve vir do application.properties
    private static final String SECRET_KEY_STRING = "uma_chave_secreta_muito_longa_para_o_algoritmo_h256_funcionar_bem";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    public String gerarToken(Usuario usuario) {
        // [IMPORTANTE] Aqui inserimos os dados que o Front precisa recuperar depois
        return Jwts.builder()
                .setSubject(usuario.getEmail()) // O "dono" do token
                .claim("id", usuario.getId()) // ID do usuário no payload
                .claim("tipo", usuario.getTipoUsuario().toString()) // Tipo (Aluno, Prof, etc)
                .claim("nome", usuario.getNome())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(LocalDateTime.now().plusHours(8).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getSubject(String token) {
        return getClaims(token).getSubject();
    }

    // Método para validar se o token está íntegro e não expirou
    public boolean isTokenValido(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}