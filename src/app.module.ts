import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { ForTestingModule } from './for-testing-module/for-testing.module';
import { UploadModule } from './upload/upload.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration, {ConfigurationType} from './config/configuration';
import {TelegramModule} from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType, true>) => {
        const databaseSettings = configService.get('databaseSettings', { infer: true });

      return {
        type: 'postgres',
        database: databaseSettings.DATABASE,
        password: databaseSettings.PASSWORD,
        username: databaseSettings.USERNAME,
        host: databaseSettings.HOST,
        autoLoadEntities: true,
        synchronize: true,
      }
      }}),
    UsersModule,
    QuizModule,
    ForTestingModule,
    UploadModule,
    TelegramModule
  ],
})
export class AppModule {}
