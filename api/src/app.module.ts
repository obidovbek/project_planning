import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ProjectsModule,
    MongooseModule.forRoot('mongodb://192.168.10.0:27017/')
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
