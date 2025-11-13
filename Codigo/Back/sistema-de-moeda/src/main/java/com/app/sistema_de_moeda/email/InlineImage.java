package com.app.sistema_de_moeda.email;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InlineImage {
    private String cid;
    private byte[] data;
}
