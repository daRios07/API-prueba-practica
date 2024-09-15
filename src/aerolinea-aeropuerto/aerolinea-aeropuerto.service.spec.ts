import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaAeropuertoService } from './aerolinea-aeropuerto.service';
import { Repository } from 'typeorm';
import { AerolineaEntity } from '../../src/aerolinea/aerolinea.entity/aerolinea.entity';
import { AeropuertoEntity } from '../../src/aeropuerto/aeropuerto.entity/aeropuerto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';


describe('AirlineAirportService', () => {
  let service: AerolineaAeropuertoService;
  let airlineRepository: Repository<AerolineaEntity>;
  let airportRepository: Repository<AeropuertoEntity>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [AerolineaAeropuertoService],
      }).compile();

      service = module.get<AerolineaAeropuertoService>(AerolineaAeropuertoService);
      airlineRepository = module.get<Repository<AerolineaEntity>>(
        getRepositoryToken(AerolineaEntity),
      );
      airportRepository = module.get<Repository<AeropuertoEntity>>(
        getRepositoryToken(AeropuertoEntity),
      );
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('agregar un aeropuerto a una aerolinea', async () => {
      const airline = await airlineRepository.save({
        id: 1,
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url()
      });
      const airport = await airportRepository.save({
        id: 2,
        nombre: faker.company.name(),
        codigo: faker.string.alpha({ length: 3 }).toUpperCase(),
        pais: faker.location.country(),
        ciudad: faker.location.city(),

      });
      const result = await service.addAirportToAirline(airline.id, airport.id);
      expect(result.aeropuertos).toContainEqual(expect.objectContaining({ id: airport.id }));
    });

    it('borrar un aeropuerto de una aerolinea', async () => {
      const airline = await airlineRepository.save({
        id: 1,
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url()
      });
      const airport = await airportRepository.save({
        id: 2,
        nombre: faker.company.name(),
        codigo: faker.string.alpha({ length: 3 }).toUpperCase(),
        pais: faker.location.country(),
        ciudad: faker.location.city(),
      });
      await service.addAirportToAirline(airline.id, airport.id);
      await service.deleteAirportFromAirline(airline.id, airport.id);
      await expect(service.findAirportFromAirline(airline.id, airport.id)).rejects.toThrow(NotFoundException);
    });
  

 

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
