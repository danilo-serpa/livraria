import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // ou 'mssql', 'postgres', etc.
      database: 'database.sqlite',
      entities: [User],
      synchronize: true, // ⚠ Apenas para desenvolvimento
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    CepModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
