import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { ForTestingModule } from './for-testing-module/for-testing.module';
import { UploadModule } from './upload/upload.module';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'tfyuxhlu',
  password: 'i706C49bh-FJUM3QrNKym2QAfmDoBqtZ',
  username: 'tfyuxhlu',
  host: 'mouse.db.elephantsql.com',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule,
    QuizModule,
    ForTestingModule,
    UploadModule,
  ],
})
export class AppModule {}
