import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import config from 'ormconfig';
import { SubcontasModule } from './subconta/subcontas.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule,SubcontasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
