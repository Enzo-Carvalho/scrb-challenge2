import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './usuario/entities/users.entity';
import { UsersModule } from './usuario/modules/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.modules';

@Module({
  imports: [
    /*
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_challenge',
      entities: [Users],
      synchronize: true

    }),
    */
    TypeOrmModule.forRoot({
      type:'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false, 
      },
      synchronize: true,
      autoLoadEntities: true
    }), 
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}