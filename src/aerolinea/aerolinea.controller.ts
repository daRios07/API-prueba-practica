import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'shared/interceptors/business-errors.interceptor';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity/aerolinea.entity';

import { plainToInstance } from 'class-transformer';
import { AerolineaDto } from './aerolinea.dto/aerolinea.dto';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaController {

    constructor(private readonly aerolineaService: AerolineaService) {}

    @Get()
    async findAll() {
        return await this.aerolineaService.findAll();
    }    

    @Get(':aerolineaId')
    async findOne(@Param('aerolineaId') aerolineaId: number): Promise<AerolineaEntity> {
        return await this.aerolineaService.findOne(aerolineaId);
    }
  
    @Post()
    async create(@Body() aerolineaDto: AerolineaDto): Promise<AerolineaEntity> {
      const aerolinea = plainToInstance(AerolineaEntity, aerolineaDto);
      return await this.aerolineaService.create(aerolinea);
    }


    @Put(':aerolineaId')
    async update(@Param('aerolineaId') aerolineaId: number, @Body() aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
      return this.aerolineaService.update(aerolineaId, aerolinea);
    }
  
    @Delete(':aerolineaId')
    @HttpCode(204)
    async delete(@Param('aerolineaId') aerolineaId: number): Promise<void> {
      return this.aerolineaService.delete(aerolineaId);
    }
}
