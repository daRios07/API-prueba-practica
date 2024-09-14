import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AerolineaAeropuertoModule } from './aerolinea-aeropuerto/aerolinea-aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity/aeropuerto.entity';
import { AerolineaEntity } from './aerolinea/aerolinea.entity/aerolinea.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aeropuertos',
      entities: [AeropuertoEntity,AerolineaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    AerolineaModule, AeropuertoModule, AerolineaAeropuertoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
