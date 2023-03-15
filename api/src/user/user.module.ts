import { Module } from '@nestjs/common';
import { SignUpController } from './controllers/signup.controller';
import { LoginController } from './controllers/login.controller';
import { AutoLoginController } from './controllers/auto-login.controller';
import { RecoverPasswordController } from './controllers/recover-password.controller';
import { RecoverPasswordNextController } from './controllers/rec-pass-next.controller'
import { UserService } from './service/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService  } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule
  ],
  controllers: [
    SignUpController, 
    LoginController, 
    AutoLoginController, 
    RecoverPasswordController,
    RecoverPasswordNextController
  ],
  providers: [UserService, ConfigService]
})
export class UserModule {}
