export class UtilsSendMail {
  public static async send(email: string, secret: number) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'suriano.monteiro@gmail.com',
        pass: 'fjklmpclivbhjoxv',
      },
    });
    const mailOptions = {
      from: 'suriano.monteiro@gmail.com',
      to: email,
      subject: '[Segurança] Resete sua senha',
      text: `Código de segurança ${secret}`,
    };
    await transporter.sendMail(mailOptions);
  }
}
