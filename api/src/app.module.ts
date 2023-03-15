import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SendGridModule } from "@anchan828/nest-sendgrid";

@Module({
  imports: [
    ProjectsModule,
    SendGridModule.forRoot({
      apikey: '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',
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://192.168.10.0:27017/')
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
