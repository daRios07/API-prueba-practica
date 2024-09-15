import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AeropuertoDto {

    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    readonly nombre: string;
  
    @IsNotEmpty({ message: 'El codigo no puede estar vacío' })
    @IsString()
    readonly codigo: string;
  
    @IsNotEmpty({ message: 'El campo pais no puede estar vacío' })
    @IsString()
    readonly pais: string;
  
    @IsNotEmpty({ message: 'El campo ciudad no puede estar vacío' })
    @IsString()
    readonly ciudad: string;
}
