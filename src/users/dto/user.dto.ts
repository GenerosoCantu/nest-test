import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly reg_time: Date;

  @ApiModelProperty()
  readonly login_fail: number;

  @ApiModelProperty()
  readonly locked: boolean;
}