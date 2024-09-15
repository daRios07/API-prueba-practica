import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AeropuertoService {

    constructor(
        @InjectRepository(AeropuertoEntity)
        private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
      ) {}
    
      async findAll(): Promise<AeropuertoEntity[]> {
        return this.aeropuertoRepository.find();
      }
    
      async findOne(id: number): Promise<AeropuertoEntity> {
        const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});
        if (!aeropuerto) {
          throw new NotFoundException("No se encuentra el aeropuerto Id "+id);
        }
        return aeropuerto;
      }
    
      async create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
        if (this.validateCode(aeropuerto.codigo)) {
          return this.aeropuertoRepository.save(aeropuerto);
        } else {
          throw new Error("Código inválido, solo debe tener 3 caracteres");
        }
      }
    
      async update(aeropuertoId: number, aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
        const currentAeropuerto = await this.findOne(aeropuertoId);
        if (this.validateCode(aeropuerto.codigo)) {
          return this.aeropuertoRepository.save({ ...currentAeropuerto, ...aeropuerto });
        } else {
            throw new Error("Código inválido, solo debe tener 3 caracteres");
        }
      }
    
      async delete(aeropuertoId: number): Promise<void> {
        let id = aeropuertoId;
        const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});
        if (!aeropuerto) {
          throw new NotFoundException("No se encuentra el aeropuerto Id "+id);
        }
        await this.aeropuertoRepository.delete(aeropuertoId);
      }
    
      private validateCode(codigo: string): boolean {
        return codigo.length === 3;
      }
}
