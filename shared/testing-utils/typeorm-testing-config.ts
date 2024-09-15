import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from '../../src/aerolinea/aerolinea.entity/aerolinea.entity';
import { AeropuertoEntity } from '../../src/aeropuerto/aeropuerto.entity/aeropuerto.entity';


export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AeropuertoEntity, AerolineaEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([AeropuertoEntity, AerolineaEntity]),
];
