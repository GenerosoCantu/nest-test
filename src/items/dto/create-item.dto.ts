import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateItemDto {

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly description: string;

  @IsInt()
  @ApiModelProperty()
  readonly qty: number;
}