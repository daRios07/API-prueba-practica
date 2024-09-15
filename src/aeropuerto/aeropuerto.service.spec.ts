import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoService } from './aeropuerto.service';
import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity/aeropuerto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker/.';
import { NotFoundException } from '@nestjs/common';

describe('AeropuertoService', () => {
  let aeropuertoService: AeropuertoService;
  let aeropuertoRepository: Repository<AeropuertoEntity>;
  let aeropuertoList: AeropuertoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    aeropuertoService = module.get<AeropuertoService>(AeropuertoService);
    aeropuertoRepository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    aeropuertoRepository.clear();
    aeropuertoList = [];

    for (let i = 0; i < 5; i++) {
      const aeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
        id: i,
        nombre: faker.commerce.productName(),
        codigo: "123",
        pais: faker.location.country(),
        ciudad: faker.location.city(),
        aerolineas: []
      });
      aeropuertoList.push(aeropuerto);
    }
  };

  it('findAll should return all aeropuerto', async () => {
    const allAeropuertos: AeropuertoEntity[] = await aeropuertoService.findAll();
    expect(allAeropuertos).not.toBeNull();
    expect(allAeropuertos).toHaveLength(aeropuertoList.length);
  });

  it('findOne should throw an exception for an invalid aeropuerto', async () => {
    await expect(() => aeropuertoService.findOne(100))
    .rejects.toThrow(
      new NotFoundException("No se encuentra el aeropuerto Id 100")
    );
  });

  it('create should return a new aeropuerto', async () => {
    const newAeropuerto: AeropuertoEntity = {
      id:50,
      nombre: faker.commerce.productName(),
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
      aerolineas: []
    };

    const returnedAeropuerto: AeropuertoEntity = await aeropuertoService.create(newAeropuerto);
    expect(returnedAeropuerto).not.toBeNull();

    const storedAeropuerto: AeropuertoEntity = await aeropuertoRepository.findOne({ where: { id: returnedAeropuerto.id } });
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(returnedAeropuerto.nombre);
    expect(storedAeropuerto.codigo).toEqual(returnedAeropuerto.codigo);
  });

  it('update should modify a aeropuerto', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    aeropuerto.nombre = "New name";

    const updatedAeropuerto: AeropuertoEntity = await aeropuertoService.update(aeropuerto.id, aeropuerto);
    expect(updatedAeropuerto).not.toBeNull();

    const storedAeropuerto: AeropuertoEntity = await aeropuertoRepository.findOne({ where: { id: aeropuerto.id } });
    expect(storedAeropuerto).not.toBeNull();
    expect(storedAeropuerto.nombre).toEqual(aeropuerto.nombre);
  });

  it('delete should remove a aerolinea', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    await aeropuertoService.delete(aeropuerto.id);

    const deletedAeropuerto: AeropuertoEntity = await aeropuertoRepository.findOne({ where: { id: aeropuerto.id } });
    expect(deletedAeropuerto).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
