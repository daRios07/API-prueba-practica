import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'shared/interceptors/business-errors.interceptor';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';
import { plainToInstance } from 'class-transformer';
import { AerolineaDto } from 'src/aerolinea/aerolinea.dto/aerolinea.dto';
import { AeropuertoDto } from './aeropuerto.dto/aeropuerto.dto';

@Controller('airports')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoController {

    
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  @Get()
  async findAll(): Promise<AeropuertoEntity[]> {
    return this.aeropuertoService.findAll();
  }

  @Get(':aeropuertoId')
  async findOne(@Param('aeropuertoId') aeropuertoId: number): Promise<AeropuertoEntity> {
    return this.aeropuertoService.findOne(aeropuertoId);
  }

  @Post()
  async create(@Body() aeropuertoDto: AeropuertoDto): Promise<AeropuertoEntity> {
    const aeropuerto = plainToInstance(AeropuertoEntity, aeropuertoDto);
    return await this.aeropuertoService.create(aeropuerto);
  }

  @Put(':aeropuertoId')
  async update(@Param('aeropuertoId') aeropuertoId: number, @Body() aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
    return this.aeropuertoService.update(aeropuertoId, aeropuerto);
  }

  @Delete(':aeropuertoId')
  @HttpCode(204)
  async delete(@Param('aeropuertoId') aeropuertoId: number): Promise<void> {
    return this.aeropuertoService.delete(aeropuertoId);
  }
}
