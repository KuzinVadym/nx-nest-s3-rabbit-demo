import { IsNotEmpty, IsString, IsObject } from 'class-validator';
  
export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsObject()
  metadata!: Record<string, unknown>;
}

