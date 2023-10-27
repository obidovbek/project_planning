import { Controller, Post, Req, Res, HttpStatus, Render, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SendGridService } from "@anchan828/nest-sendgrid";
import { MailerService } from "@nestjs-modules/mailer";
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

// const handlebars = require(“handlebars”)

@Controller('user/recover')      
export class RecoverPasswordController {
    constructor(
        private readonly userService: UserService,
        private readonly sendGrid: SendGridService,
        private mailerService: MailerService
    ){}

    @Post()
    async userRecoverPassword(@Req() request, @Res() response){
        const recover = await this.userService.userRecoverPassword(request);
        if(recover && recover.status === 200){
          this.sendMail(request.body.email, recover.token, response);
        }
        return response.status(HttpStatus.CREATED).json(recover)
    }

    async sendMail(toEmail:string, token:string, response): Promise<void> {
      // const recover_button = '<a href="http://localhost:4200/user-recover?token="'+token+'><strong></strong></a>'
      const emailTemplate = fs.readFileSync(path.join(__dirname, "./../../templates/mail/confirmation.hbs"), "utf-8")
      const template = handlebars.compile(emailTemplate)
      const messageBody = (template({url_recovery: `http://localhost:4200/auth/recover-pass?t=${token}`}))
      await this.sendGrid.send({
          to: toEmail,
          from: "noreply@ferpi.uz",
          subject: "Parolni qayta tiklash",
          html: messageBody,
          // html: `<a style="color:red;" href="http://localhost:4200/auth/recover-pass?t=${token}"><button>TIKLASH</button></a>`,
        });
    }
    
      @Get()
      async sendMailSec(email: string, name: string) {
        await this.mailerService.sendMail({
            to: 'obidovbek94@gmail.com',
            subject: 'Greeting from NestJS NodeMailer',
            template: 'confirmation',
            context: {
              name: 'name',
              url: 'url'
            }
        })
    }
}
