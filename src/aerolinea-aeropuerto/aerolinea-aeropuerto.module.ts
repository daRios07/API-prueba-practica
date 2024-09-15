import { Module } from '@nestjs/common';
import { AerolineaAeropuertoService } from './aerolinea-aeropuerto.service';
import { AerolineaAeropuertoController } from './aerolinea-aeropuerto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity/aerolinea.entity';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity/aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  providers: [AerolineaAeropuertoService],
  controllers: [AerolineaAeropuertoController]
})
export class AerolineaAeropuertoModule {}
