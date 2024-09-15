import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity/aerolinea.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { NotFoundException } from '@nestjs/common';

describe('AerolineaService', () => {
  let aerolineaService: AerolineaService;
  let aerolineaRepository: Repository<AerolineaEntity>;
  let aerolineaList: AerolineaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    aerolineaService = module.get<AerolineaService>(AerolineaService);
    aerolineaRepository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    aerolineaRepository.clear();
    aerolineaList = [];

    for (let i = 0; i < 5; i++) {
      const aerolinea: AerolineaEntity = await aerolineaRepository.save({
        nombre: faker.commerce.productName(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url(),
        aeropuertos: [],
      
      });
      aerolineaList.push(aerolinea);
    }
  };


    it('findAll should return all aerolineas', async () => {
      const allAerolineas: AerolineaEntity[] = await aerolineaService.findAll();
      expect(allAerolineas).not.toBeNull();
      expect(allAerolineas).toHaveLength(aerolineaList.length);
    });

    it('findOne should return a aerolinea by id', async () => {
      const storedAerolinea: AerolineaEntity = aerolineaList[0];
      const aerolinea: AerolineaEntity = await aerolineaService.findOne(storedAerolinea.id);
      expect(aerolinea).not.toBeNull();
      expect(aerolinea.nombre).toEqual(storedAerolinea.nombre);
      expect(aerolinea.descripcion).toEqual(storedAerolinea.descripcion);
    });


    it('findOne should throw an exception for an invalid aerolinea', async () => {
      await expect(() => aerolineaService.findOne(100))
      .rejects.toThrow(
        new NotFoundException('No se encuentra la aerolinea con ID 100')
      );
    });

    it('create should return a new aerolinea', async () => {
      const newAerolinea: AerolineaEntity = {
        id:50,
        nombre: faker.commerce.productName(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url(),
        aeropuertos: [],
      };
  
      const returnedAerolinea: AerolineaEntity = await aerolineaService.create(newAerolinea);
      expect(returnedAerolinea).not.toBeNull();
  
      const storedAerolinea: AerolineaEntity = await aerolineaRepository.findOne({ where: { id: returnedAerolinea.id } });
      expect(storedAerolinea).not.toBeNull();
      expect(storedAerolinea.nombre).toEqual(returnedAerolinea.nombre);
      expect(storedAerolinea.descripcion).toEqual(returnedAerolinea.descripcion);
    });

    it('update should modify a aerolinea', async () => {
      const aerolinea: AerolineaEntity = aerolineaList[0];
      aerolinea.nombre = "New name";
  
      const updatedAerolinea: AerolineaEntity = await aerolineaService.update(aerolinea.id, aerolinea);
      expect(updatedAerolinea).not.toBeNull();
  
      const storedAerolinea: AerolineaEntity = await aerolineaRepository.findOne({ where: { id: aerolinea.id } });
      expect(storedAerolinea).not.toBeNull();
      expect(storedAerolinea.nombre).toEqual(aerolinea.nombre);
    });

    it('delete should remove a aerolinea', async () => {
      const aerolinea: AerolineaEntity = aerolineaList[0];
      await aerolineaService.delete(aerolinea.id);
  
      const deletedAerolinea: AerolineaEntity = await aerolineaRepository.findOne({ where: { id: aerolinea.id } });
      expect(deletedAerolinea).toBeNull();
    });

  

  afterEach(() => {
    jest.clearAllMocks();
  });
});
