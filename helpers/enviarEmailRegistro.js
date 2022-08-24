import nodemailer from 'nodemailer';

const enviarEmailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {nombre,email,token} = datos;

    //Enviar el email
    const info = await transport.sendMail({
        from: 'API WS - REGISTRO CLIENTE',
        to: email,
        subject: 'Comprueba tu cuenta',
        text: 'Comprueba tu cuenta',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta para API WSP. </p>
            <p>Tu cuenta ya esta lista, solo comprueba en este enlace:
            <a href="http://localhost:3000/api/v1/usuario/confirmar/${token}">Comprobar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
}

export default enviarEmailRegistro;