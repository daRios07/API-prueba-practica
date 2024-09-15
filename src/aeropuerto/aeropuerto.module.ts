import { Module } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],
  providers: [AeropuertoService],
  exports: [AeropuertoService],
})
export class AeropuertoModule {}
