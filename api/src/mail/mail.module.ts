import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: '.gmail.com',
        secure: true,
        port: 587,
        auth: {
          user: 'obidovbek94@gmail.com',
          pass: 'tflyrpzqshcjkmnr',
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
    
        }
      },
      defaults: {
        from: `"TdotCode" <obidovbek94@gmail.com>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}