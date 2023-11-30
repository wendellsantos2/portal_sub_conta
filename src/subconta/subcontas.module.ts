import { Module } from '@nestjs/common';
 
import { SubContasService } from './subcontas.service';
import { SubContasController } from './subcontas.controller';
import { SubConta } from 'src/entities/subconta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
 

@Module({
    imports: [TypeOrmModule.forFeature([SubConta])],
  controllers: [SubContasController],
  providers: [SubContasService],
})
export class SubcontasModule {}
