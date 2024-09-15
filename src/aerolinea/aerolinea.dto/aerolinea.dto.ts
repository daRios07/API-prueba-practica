import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AerolineaDto {

    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString()
    readonly nombre: string;
  
    @IsString()
    readonly descripcion: string;
    
    
    @IsDateString()
    @IsNotEmpty()
    readonly fechaFundacion: Date;
  
    @IsString()
    @IsNotEmpty()
    readonly paginaWeb: string;
}
