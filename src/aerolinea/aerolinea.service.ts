import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AerolineaEntity } from './aerolinea.entity/aerolinea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AerolineaService {

    constructor(
        @InjectRepository(AerolineaEntity)
        private readonly aerolineaRepository: Repository<AerolineaEntity>,
      ) {}
    
      async findAll(): Promise<AerolineaEntity[]> {
        return this.aerolineaRepository.find();
      }
    
      async findOne(id: number): Promise<AerolineaEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({where:{id}});
        if (!aerolinea) {
          throw new NotFoundException("No se encuentra la aerolinea con ID "+id);
        }
        return aerolinea;
      }
    
      async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
        if (this.validateDate(aerolinea.fechaFundacion)) {
          return this.aerolineaRepository.save(aerolinea);
        } else {
          throw new Error('Fecha inválida.');
        }
      }
    
      async update(id: number, aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
        const currentAerolinea = await this.findOne(id);
    
        if (this.validateDate(aerolinea.fechaFundacion)) {
          return this.aerolineaRepository.save({ ...currentAerolinea, ...aerolinea });
        } else {
            throw new Error('Fecha inválida.');
        }
      }
    
      async delete(id: number): Promise<void> {
        await this.aerolineaRepository.delete(id);
      }
    
      private validateDate(fecha: Date): boolean {
        return new Date(fecha) < new Date();
      }
}
