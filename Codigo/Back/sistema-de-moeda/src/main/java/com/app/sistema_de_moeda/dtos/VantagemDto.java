package com.app.sistema_de_moeda.dtos;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

public record VantagemDto(
	Long id,
	String titulo,
	String descricao,
	@JsonProperty("custoEmMoedas") @JsonAlias({"custoMoedas"}) BigDecimal custoEmMoedas,
	String foto,
	String empresaNome,
	Long empresaParceiraId
) {
}
