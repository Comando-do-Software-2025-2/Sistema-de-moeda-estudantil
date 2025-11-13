package com.app.sistema_de_moeda.email.template;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplate {

    public String getMoedasRecebidaTemplate(String alunoNome, int valor, String professorNome, String motivo) {
        return String.format(
            """
            <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body { font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                  .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 20px; }
                  .content { line-height: 1.6; }
                  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
                  .highlight { background-color: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0; }
                  .moedas-value { font-size: 24px; color: #27ae60; font-weight: bold; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Moedas Recebidas!</h1>
                  </div>
                  <div class="content">
                    <p>Olá <strong>%s</strong>,</p>
                    <p>Você recebeu uma recompensa de moedas por seu desempenho!</p>
                    <div class="highlight">
                      <p>Professor: <strong>%s</strong></p>
                      <p class="moedas-value">%d moedas</p>
                      <p>Motivo: <strong>%s</strong></p>
                    </div>
                    <p>Essas moedas estão disponíveis na sua carteira e podem ser usadas para resgatar benefícios com nossos parceiros.</p>
                    <p>Continue com seu excelente trabalho!</p>
                  </div>
                  <div class="footer">
                    <p>Sistema de Moeda Estudantil</p>
                  </div>
                </div>
              </body>
            </html>
            """, alunoNome, professorNome, valor, motivo
        );
    }

    public String getCupomResgateTemplate(String alunoNome, String vantagemTitulo, String codigoCupom, String qrCodeCid) {
        return String.format(
            """
            <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body { font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                  .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 20px; }
                  .content { line-height: 1.6; }
                  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
                  .cupom-box { background-color: #ecf0f1; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
                  .cupom-code { font-size: 20px; font-weight: bold; color: #e74c3c; letter-spacing: 2px; font-family: monospace; }
                  .qr-code { text-align: center; margin: 20px 0; }
                  .qr-code img { max-width: 200px; height: auto; border: 2px solid #2c3e50; padding: 5px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Cupom de Resgate</h1>
                  </div>
                  <div class="content">
                    <p>Olá <strong>%s</strong>,</p>
                    <p>Você resgatou a seguinte vantagem:</p>
                    <h2 style="color: #27ae60; text-align: center;">%s</h2>
                    <div class="cupom-box">
                      <p>Código do Cupom:</p>
                      <p class="cupom-code">%s</p>
                    </div>
                    <div class="qr-code">
                      <p>Escaneie o QR Code abaixo:</p>
                      <img src="cid:%s" alt="QR Code do Cupom" />
                    </div>
                    <p>Apresente este cupom na empresa parceira para resgatar sua vantagem. O código pode ser utilizado uma única vez.</p>
                  </div>
                  <div class="footer">
                    <p>Sistema de Moeda Estudantil</p>
                  </div>
                </div>
              </body>
            </html>
            """, alunoNome, vantagemTitulo, codigoCupom, qrCodeCid
        );
    }

    public String getNotificacaoEmpresaTemplate(String empresaNome, String alunoNome, String vantagemTitulo, String codigoCupom, String qrCodeCid) {
        return String.format(
            """
            <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body { font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                  .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 20px; }
                  .content { line-height: 1.6; }
                  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
                  .notificacao-box { background-color: #e8f8f5; padding: 20px; border-radius: 4px; border-left: 4px solid #27ae60; margin: 20px 0; }
                  .cupom-code { font-size: 18px; font-weight: bold; color: #e74c3c; font-family: monospace; }
                  .qr-code { text-align: center; margin: 20px 0; }
                  .qr-code img { max-width: 150px; height: auto; border: 2px solid #2c3e50; padding: 5px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Notificação de Resgate</h1>
                  </div>
                  <div class="content">
                    <p>Olá <strong>%s</strong>,</p>
                    <p>Um aluno resgatou uma de suas vantagens parceiras:</p>
                    <div class="notificacao-box">
                      <p><strong>Aluno:</strong> %s</p>
                      <p><strong>Vantagem:</strong> %s</p>
                      <p><strong>Código do Cupom:</strong> <span class="cupom-code">%s</span></p>
                    </div>
                    <div class="qr-code">
                      <p>QR Code do Cupom:</p>
                      <img src="cid:%s" alt="QR Code do Cupom" />
                    </div>
                    <p>Por favor, valide o cupom acima com o aluno na hora da compra. O código pode ser utilizado uma única vez.</p>
                    <p>Obrigado por ser uma empresa parceira do Sistema de Moeda Estudantil!</p>
                  </div>
                  <div class="footer">
                    <p>Sistema de Moeda Estudantil</p>
                  </div>
                </div>
              </body>
            </html>
            """, empresaNome, alunoNome, vantagemTitulo, codigoCupom, qrCodeCid
        );
    }
}
