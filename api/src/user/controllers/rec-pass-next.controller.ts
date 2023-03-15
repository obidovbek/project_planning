import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SendGridService } from "@anchan828/nest-sendgrid";

@Controller('user/recover-next')      
export class RecoverPasswordNextController {
    constructor(
        private readonly userService: UserService,
        private readonly sendGrid: SendGridService
    ){}

    @Post()
    async userRecoverPassword(@Req() request, @Res() response){
        const recover = await this.userService.userRecoverPasswordNext(request);
        // this.sendMail(recover.email);
        return response.status(HttpStatus.CREATED).json(recover)
    }

    async sendMail(toEmail:string): Promise<void> {
      await this.sendGrid.send({
          to: toEmail,
          from: "noreply@ferpi.uz",
          subject: "Parolni qayta tiklash",
          text: "Sizning parolingiz qayta tiklandi",
          html: `<strong style="color:red;">Sizning parolingiz qayta tiklandi</strong>`,
        });
      }
}
