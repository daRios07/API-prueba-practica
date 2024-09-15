import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AerolineaEntity } from '../../src/aerolinea/aerolinea.entity/aerolinea.entity';
import { AeropuertoEntity } from '../../src/aeropuerto/aeropuerto.entity/aeropuerto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AerolineaAeropuertoService {

    constructor(
        @InjectRepository(AerolineaEntity)
        private readonly aerolineaRepository: Repository<AerolineaEntity>,
        @InjectRepository(AeropuertoEntity)
        private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
      ) {}
    
      async addAirportToAirline(aerolineaId: number, aeropuertoId: number): Promise<AerolineaEntity> {
        let id = aerolineaId
        const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos']});
        id = aeropuertoId
        const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});
    
        if (!aerolinea || !aeropuerto) {
          throw new NotFoundException('Aerolínea o aeropuerto no encontrado');
        }
    
        aerolinea.aeropuertos = [...aerolinea.aeropuertos, aeropuerto];
        return this.aerolineaRepository.save(aerolinea);
      }

      async findAirportsFromAirline(aerolineaId: number): Promise<AeropuertoEntity[]> {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea) {
          throw new NotFoundException('Aerolinea no encontrada');
        }
        return aerolinea.aeropuertos;
      }
    
      async findAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<AeropuertoEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea) {
          throw new NotFoundException('Aerolinea no encontrada');
        }
        const aropuerto = aerolinea.aeropuertos.find((aeropuerto) => aeropuerto.id === aeropuertoId);
        if (!aropuerto) {
          throw new NotFoundException('Aeropuerto no encontrada');
        }
        return aropuerto;
      }

      async updateAirportsFromAirline(aerolineaId: number, nuevosAeropuertosIds: number[]): Promise<void> {
        let id = aerolineaId
        const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos']});
    
        if (!aerolinea) {
          throw new NotFoundException('No se encontro la aerolinea');
        }
    
        let aeropuertos: AeropuertoEntity[]=[]
        for (let index = 0; index < nuevosAeropuertosIds.length; index++) {
          const id = nuevosAeropuertosIds[index];
          
          const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});
          if (!aeropuerto) {
            throw new NotFoundException(`no se encontró el aeropuerto con Id ${id}`);
          }
          aeropuertos.push(aeropuerto);
        }
    
        aerolinea.aeropuertos = aeropuertos;
        await this.aerolineaRepository.save(aerolinea);
      }

      async deleteAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<void> {
        const aerolinea = await this.aerolineaRepository.findOne({
          where: { id: aerolineaId },
          relations: ['aeropuertos'],
        });
        if (!aerolinea) {
          throw new NotFoundException('No se encontro la aerolinea');
        }
        aerolinea.aeropuertos = aerolinea.aeropuertos.filter((airport) => airport.id !== aeropuertoId);
        await this.aerolineaRepository.save(aerolinea);
      }


    
}
