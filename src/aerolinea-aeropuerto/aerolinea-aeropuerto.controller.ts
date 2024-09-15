import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'shared/interceptors/business-errors.interceptor';
import { AeropuertoEntity } from '../../src/aeropuerto/aeropuerto.entity/aeropuerto.entity';
import { AerolineaAeropuertoService } from './aerolinea-aeropuerto.service';
import { AerolineaEntity } from '../../src/aerolinea/aerolinea.entity/aerolinea.entity';

@Controller('airlines/:aerolineaId/airports')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaAeropuertoController {

    
  constructor(private readonly aerolineaAeropuertoService: AerolineaAeropuertoService) {}

  @Post(':aeropuertoId')
  async addAirportToAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<AerolineaEntity> {
    return this.aerolineaAeropuertoService.addAirportToAirline(aerolineaId, aeropuertoId);
  }

  @Get()
  async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: number): Promise<AeropuertoEntity[]> {
    return this.aerolineaAeropuertoService.findAirportsFromAirline(aerolineaId);
  }

  @Get(':aeropuertoId')
  async findAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<AeropuertoEntity> {
    return this.aerolineaAeropuertoService.findAirportFromAirline(aerolineaId, aeropuertoId);
  }

  @Put()
  async updateAirportsFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Body() nuevosAeropuertosIds: number[],
  ): Promise<AeropuertoEntity[]> {
    return this.aerolineaAeropuertoService.updateAirportsFromAirline(aerolineaId, nuevosAeropuertosIds);
  }

  @Delete(':aeropuertoId')
  @HttpCode(204)
  async deleteAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<void> {
    return this.aerolineaAeropuertoService.deleteAirportFromAirline(aerolineaId, aeropuertoId);
  }
}
